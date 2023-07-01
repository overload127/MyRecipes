import io
import random
from pathlib import Path
from io import StringIO
from hashlib import sha1

from PIL import Image
from django.core.files.base import ContentFile
from django.db import models
from django.db.models.fields.files import ImageFieldFile
from django.conf import settings


class WEBPFieldFile(ImageFieldFile):

    def save(self, name, content, save=True):
        content.file.seek(0)
        image = Image.open(content.file)
        image_bytes = io.BytesIO()
        image.save(fp=image_bytes, format="WEBP")
        image_content_file = ContentFile(content=image_bytes.getvalue())

        salt = sha1(
            str(random.random()).encode(encoding='UTF-8', errors='strict')
            ).hexdigest()[:5]
        fname = sha1((salt + settings.SECRET_KEY).encode(encoding='UTF-8', errors='strict')).hexdigest()

        filename = Path(fname)
        filename_replace_ext = filename.with_suffix('.webp')
        super().save(filename_replace_ext, image_content_file, save)


class WEBPField(models.ImageField):
    attr_class = WEBPFieldFile
