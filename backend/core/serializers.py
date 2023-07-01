import magic
from django.conf import settings

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from phonenumber_field.serializerfields import PhoneNumberField


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.first_name

        return token


class ProfileSerializerFull(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    email = serializers.EmailField(allow_blank=True)
    url_avatar = serializers.ImageField(use_url=True, required=False)
    birthday = serializers.DateField(required=False)
    gender = serializers.IntegerField(required=True)
    phone = PhoneNumberField(required=False)


class ProfileAvatarSerializer(serializers.Serializer):
    avatar = serializers.ImageField(required=True)

    def validate_avatar(self, image):
        if image.size > settings.UPLOAD_FILE_MAX_SIZE:
            raise serializers.ValidationError(f'size {image.size} larger than {settings.UPLOAD_FILE_MAX_SIZE/1024/1024} MB')
        
        extension = image.name.split('.')[-1]
        if not extension or extension.lower() not in settings.WHITELISTED_IMAGE_TYPES.keys():
            raise serializers.ValidationError(f'invalid image extension. Current extension [{extension}]. Allowed extensions [{", ".join(settings.WHITELISTED_IMAGE_TYPES.keys())}]')
        
        content_type = image.content_type
        if content_type not in settings.WHITELISTED_IMAGE_TYPES.values():
            raise serializers.ValidationError(f'invalid image content-type. Current content-type [{content_type}]. Allowed content-types [{", ".join(settings.WHITELISTED_IMAGE_TYPES.values())}]')

        mime_type = magic.from_buffer(image.read(1024), mime=True)
        if mime_type not in settings.WHITELISTED_IMAGE_TYPES.values() and mime_type != content_type:
            raise serializers.ValidationError(f'invalid image mime-type. Current mime-type [{mime_type}]. Allowed mime-types [{", ".join(settings.WHITELISTED_IMAGE_TYPES.values())}]')

        return image


class ProfileSerializerBase(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    birthday = serializers.DateField(required=False, allow_null=True)
    gender = serializers.IntegerField(required=True)
    phone = PhoneNumberField(required=False)
