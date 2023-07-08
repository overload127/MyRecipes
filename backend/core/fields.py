import io
import random
from pathlib import Path
from io import StringIO
from hashlib import sha1

from PIL import Image
from django.core.files.base import ContentFile
from django.db import models
from django.db.transaction import atomic
from django.db.models.fields.files import ImageFieldFile
from django.db.models.fields.related_descriptors import ReverseOneToOneDescriptor

from django.conf import settings


class WEBPFieldFile(ImageFieldFile):
    def save(self, name, content, save=True):
        content.file.seek(0)
        image = Image.open(content.file)
        image_bytes = io.BytesIO()
        image.save(fp=image_bytes, format="WEBP")
        image_content_file = ContentFile(content=image_bytes.getvalue())

        salt = sha1(
            str(random.random()).encode(encoding="UTF-8", errors="strict")
        ).hexdigest()[:5]
        fname = sha1(
            (salt + settings.SECRET_KEY).encode(encoding="UTF-8", errors="strict")
        ).hexdigest()

        filename = Path(fname)
        filename_replace_ext = filename.with_suffix(".webp")
        super().save(filename_replace_ext, image_content_file, save)


class WEBPField(models.ImageField):
    attr_class = WEBPFieldFile


# use code from https://softwaremaniacs.org/blog/2007/03/07/auto-one-to-one-field/
# use code from https://github.com/skorokithakis/django-annoying
class AutoSingleRelatedObjectDescriptor(ReverseOneToOneDescriptor):
    @atomic
    def __get__(self, instance, instance_type=None):
        model = getattr(self.related, "related_model", self.related.model)

        try:
            return super(AutoSingleRelatedObjectDescriptor, self).__get__(
                instance, instance_type
            )
        except model.DoesNotExist:
            # Using get_or_create instead() of save() or create() as it better handles race conditions
            obj, _ = model.objects.get_or_create(**{self.related.field.name: instance})

            # Update Django's cache, otherwise first 2 calls to obj.relobj
            # will return 2 different in-memory objects
            self.related.set_cached_value(instance, obj)
            self.related.field.set_cached_value(obj, instance)
            return obj


class AutoOneToOneField(models.OneToOneField):
    """
    OneToOneField, которое создает зависимый объект при первом обращении
    из родительского, если он еще не создан.
    """

    def contribute_to_related_class(self, cls, related):
        setattr(
            cls, related.get_accessor_name(), AutoSingleRelatedObjectDescriptor(related)
        )
        # if not cls._meta.one_to_one_field:
        #     cls._meta.one_to_one_field = self
