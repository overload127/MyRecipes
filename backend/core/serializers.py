import magic
from django.conf import settings
from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

from phonenumber_field.serializerfields import PhoneNumberField

from core.models import Profile


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["name"] = user.first_name

        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
        ]


class ProfileFullSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = "__all__"


class ProfileAvatarSerializer(serializers.ModelSerializer):
    def validate_avatar(self, image):
        if image.size > settings.UPLOAD_FILE_MAX_SIZE:
            raise serializers.ValidationError(
                f"size {image.size} larger than "
                f"{settings.UPLOAD_FILE_MAX_SIZE/1024/1024} MB"
            )

        extension = image.name.split(".")[-1]
        if (
            not extension
            or extension.lower() not in settings.WHITELISTED_IMAGE_TYPES.keys()
        ):
            raise serializers.ValidationError(
                f'invalid image extension. Current extension [{extension}]. Allowed extensions [{", ".join(settings.WHITELISTED_IMAGE_TYPES.keys())}]'
            )

        content_type = image.content_type
        if content_type not in settings.WHITELISTED_IMAGE_TYPES.values():
            raise serializers.ValidationError(
                f'invalid image content-type. Current content-type [{content_type}]. Allowed content-types [{", ".join(settings.WHITELISTED_IMAGE_TYPES.values())}]'
            )

        mime_type = magic.from_buffer(image.read(1024), mime=True)
        if (
            mime_type not in settings.WHITELISTED_IMAGE_TYPES.values()
            and mime_type != content_type
        ):
            raise serializers.ValidationError(
                f'invalid image mime-type. Current mime-type [{mime_type}]. Allowed mime-types [{", ".join(settings.WHITELISTED_IMAGE_TYPES.values())}]'
            )

        return image

    class Meta:
        model = Profile
        fields = ["avatar"]
        extra_kwargs = {"avatar": {"required": True}}


class ProfileSerializerBase(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    birthday = serializers.DateField(allow_null=True)
    gender = serializers.IntegerField()
    phone = PhoneNumberField(allow_blank=True)


class ProfileSocialNetworksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
        ] + Profile.social_fields
