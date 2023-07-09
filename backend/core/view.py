import logging

from django.conf import settings

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from backend.settings import BASE_DIR, MEDIA_URL
from core.serializers import (
    ProfileSerializerBase,
    ProfileAvatarSerializer,
    ProfileFullSerializer,
    ProfileSocialNetworksSerializer,
)


logger = logging.getLogger(__name__)
logger.info("start site")

AVATARS_DIR = BASE_DIR.joinpath("avatars")
AVATARS_URL = f"{MEDIA_URL}/avatar"


class ProfileDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_profile = request.user.profile
        serializer = ProfileFullSerializer(
            current_profile,
            context={"request": request} if settings.DEBUG else {},
        )
        return Response(serializer.data)


class ProfileAvatar(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def patch(self, request):
        serializer = ProfileAvatarSerializer(
            data=request.data, context={"request": request} if settings.DEBUG else {}
        )
        serializer.is_valid(raise_exception=True)

        try:
            current_profile = request.user.profile
            current_profile.avatar = serializer.validated_data["avatar"]
            current_profile.save()
        except Exception as e:
            logger.error(f"Failed save to db.\nError is {e}")
            return Response(
                {"error": "Error processing avatar file"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        out_serializer = ProfileAvatarSerializer(
            {"avatar": current_profile.avatar},
            context={"request": request} if settings.DEBUG else {},
        )
        return Response(out_serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        try:
            current_profile = request.user.profile
            current_profile.avatar = None
            current_profile.save()
        except Exception as e:
            logger.error(f"Failed save to db.\nError is {e}")
            return Response(
                {"error": "Error processing avatar file"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({}, status=status.HTTP_200_OK)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_base_data_profile(request):
    serializer = ProfileSerializerBase(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = request.user
    try:
        user.first_name = serializer.data["first_name"]
        user.last_name = serializer.data["last_name"]
        user.save()
    except Exception as e:
        logger.error(f"Failed save to db.\nError is {e}")
        return Response(
            {"error": "Error processing update data"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    try:
        current_profile = request.user.profile
        current_profile.birthday = serializer.data["birthday"]
        current_profile.gender = serializer.data["gender"]
        current_profile.phone = serializer.data["phone"]
        current_profile.save()
    except Exception as e:
        logger.error(f"Failed save to db.\nError is {e}")
        return Response(
            {"error": "Error processing update data"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    serializer = ProfileFullSerializer(
        current_profile,
        context={"request": request} if settings.DEBUG else {},
    )
    return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileSocialNetworks(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        current_profile = request.user.profile
        serializer = ProfileSocialNetworksSerializer(current_profile, data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            serializer.save()
        except Exception as e:
            logger.error(f"Failed save to db.\nError is {e}")
            return Response(
                {"error": "Error processing avatar file"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        serializer = ProfileFullSerializer(
            current_profile,
            context={"request": request} if settings.DEBUG else {},
        )
        return Response(serializer.data, status=status.HTTP_200_OK)
