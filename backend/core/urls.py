from django.urls import path

from core.view import (
    ProfileAvatar,
    update_base_data_profile,
    ProfileDetail,
)

app_name = "core"

urlpatterns = [
    path("profile/upload-avatar/", ProfileAvatar.as_view(), name="upload-avatar"),
    path("profile/", ProfileDetail.as_view(), name="get-data-profile"),
    path(
        "profile/update-base/",
        update_base_data_profile,
        name="update-data-base-profile",
    ),
]
