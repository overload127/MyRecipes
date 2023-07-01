import logging

from django.conf import settings

from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated

from PIL import Image
from backend.settings import BASE_DIR, MEDIA_URL
from core.models import Profile
from core.serializers import ProfileSerializerFull, ProfileSerializerBase, ProfileAvatarSerializer


logger = logging.getLogger(__name__)
logger.info('start site')

AVATARS_DIR = BASE_DIR.joinpath('avatars')
AVATARS_URL = f'{MEDIA_URL}/avatar'


@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def upload_avatar_profile(request):
    if request.method == 'PATCH':
        serializer = ProfileAvatarSerializer(data=request.data, context={"request": request} if settings.DEBUG else {})
        serializer.is_valid(raise_exception=True)

        try:
            current_profile = Profile.objects.get(user=request.user)
            current_profile.avatar = serializer.validated_data['avatar']
            current_profile.save()
        except Exception as e:
            logger.error(f'Failed save to db.\nError is {e}')
            return Response({'error': 'Error processing avatar file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        out_serializer = ProfileAvatarSerializer({'avatar': current_profile.avatar}, context={"request": request} if settings.DEBUG else {})
        return Response(out_serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        try:
            current_profile = Profile.objects.get(user=request.user)
            current_profile.avatar = None
            current_profile.save()
        except Exception as e:
            logger.error(f'Failed save to db.\nError is {e}')
            return Response({'error': 'Error processing avatar file'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_data_profile(request):
    current_profile = Profile.objects.get(user=request.user)
    data = {
        'id': request.user.id,
        'username': request.user.username,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'email': request.user.email,
        'gender': current_profile.gender,
    }

    if current_profile.avatar:
        data['url_avatar'] = current_profile.avatar

    if current_profile.birthday:
        data['birthday'] = current_profile.birthday

    if current_profile.gender:
        data['gender'] = current_profile.gender

    if current_profile.phone:
        data['phone'] = current_profile.phone

    serializer = ProfileSerializerFull(data, context={"request": request} if settings.DEBUG else {})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_base_data_profile(request):
    serializer = ProfileSerializerBase(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = request.user
    try:
        user.first_name = serializer.data['first_name']
        user.last_name = serializer.data['last_name']
        user.save()
    except Exception as e:
        logger.error(f'Failed save to db.\nError is {e}')
        return Response({'error': 'Error processing update data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        current_profile = Profile.objects.get(user=request.user)
        current_profile.birthday = serializer.data['birthday']
        current_profile.gender = serializer.data['gender']
        current_profile.phone = serializer.data['phone']
        current_profile.save()
    except Exception as e:
        logger.error(f'Failed save to db.\nError is {e}')
        return Response({'error': 'Error processing update data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.data, status=status.HTTP_200_OK)
