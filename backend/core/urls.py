from django.urls import path

from core.view import (
    upload_avatar_profile, get_data_profile, update_base_data_profile)

app_name = 'core'

urlpatterns = [
    path('profile/upload-avatar/', upload_avatar_profile, name='upload-avatar'),
    path('profile/', get_data_profile, name='get-data-profile'),
    path('profile/update-base/', update_base_data_profile, name='update-data-base-profile'),
]
