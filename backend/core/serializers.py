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


class ProfileSerializerBase(serializers.Serializer):
    id = serializers.IntegerField()
    first_name = serializers.CharField(allow_blank=True)
    last_name = serializers.CharField(allow_blank=True)
    birthday = serializers.DateField(required=False, allow_null=True)
    gender = serializers.IntegerField(required=True)
    phone = PhoneNumberField(required=False)
