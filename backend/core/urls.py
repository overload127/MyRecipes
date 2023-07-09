from django.urls import path

from core.view import (
    ProfileAvatar,
    update_base_data_profile,
    ProfileDetail,
    ProfileSocialNetworks,
)

app_name = "core"

urlpatterns = [
    path("profile/", ProfileDetail.as_view(), name="get-data-profile"),
    path("profile/upload-avatar/", ProfileAvatar.as_view(), name="upload-avatar"),
    path(
        "profile/update-base/",
        update_base_data_profile,
        name="update-data-base-profile",
    ),
    path(
        "profile/update-social-networks/",
        ProfileSocialNetworks.as_view(),
        name="update-social-networks",
    ),
]
