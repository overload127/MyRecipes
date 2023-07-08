from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext as _

from phonenumber_field.modelfields import PhoneNumberField

from core.fields import WEBPField, AutoOneToOneField


class Profile(models.Model):
    """
    Note: Not call Profile never. Only from user by related field. Request for field AutoOneToOneField
    """

    GENDER_MALE = 0
    GENDER_MALE = 1
    GENDER_FEMALE = 2
    GENDER_CHOICES = [
        (GENDER_MALE, _("Not Specified")),
        (GENDER_MALE, _("Male")),
        (GENDER_FEMALE, _("Female")),
    ]

    user = AutoOneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    avatar = WEBPField(upload_to="profiles/avatars/", null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDER_CHOICES, default=0)
    phone = PhoneNumberField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return self.user.username
