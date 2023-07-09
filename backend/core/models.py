from django.db import models
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
import re

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

    # Manual update. Contains all fields related to links to social networks
    social_fields = [
        "social_other_url",
        "social_facebook_url",
        "social_youtube_url",
        "social_instagram_url",
        "social_tiktok_url",
        "social_twitter_url",
        "social_twitch_url",
        "social_reddit_url",
        "social_pinterest_url",
        "social_vk_url",
        "social_telegram_url",
        "social_whatsapp_url",
    ]

    user = AutoOneToOneField(User, related_name="profile", on_delete=models.CASCADE)
    avatar = WEBPField(upload_to="profiles/avatars/", null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDER_CHOICES, default=0)
    phone = PhoneNumberField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    social_other_url = models.URLField(
        max_length=200, verbose_name=_("Other social"), blank=True, default=""
    )
    social_facebook_url = models.URLField(
        max_length=200, verbose_name=_("Facebook social"), blank=True, default=""
    )
    social_youtube_url = models.URLField(
        max_length=200, verbose_name=_("Youtube social"), blank=True, default=""
    )
    social_instagram_url = models.URLField(
        max_length=200, verbose_name=_("Instagram social"), blank=True, default=""
    )
    social_tiktok_url = models.URLField(
        max_length=200, verbose_name=_("TikTok social"), blank=True, default=""
    )
    social_twitter_url = models.URLField(
        max_length=200, verbose_name=_("Twitter social"), blank=True, default=""
    )
    social_twitch_url = models.URLField(
        max_length=200, verbose_name=_("Twitch social"), blank=True, default=""
    )
    social_reddit_url = models.URLField(
        max_length=200, verbose_name=_("Reddit social"), blank=True, default=""
    )
    social_pinterest_url = models.URLField(
        max_length=200, verbose_name=_("Pinterest social"), blank=True, default=""
    )
    social_vk_url = models.URLField(
        max_length=200, verbose_name=_("VK social"), blank=True, default=""
    )
    social_telegram_url = models.URLField(
        max_length=200, verbose_name=_("Telegram social"), blank=True, default=""
    )
    social_whatsapp_url = models.URLField(
        max_length=200, verbose_name=_("Whatsapp social"), blank=True, default=""
    )

    def __str__(self):
        return f"<{self.user.id}>-<{self.user.username}>"

    def clean(self):
        super().clean()
        self.ensure_https_for_fields()

    def save(self, *args, **kwargs):
        self.ensure_https_for_fields()
        super().save(*args, **kwargs)

    def ensure_https_for_fields(self):
        url_validator = URLValidator(schemes=["https"])

        for field in self.social_fields:
            url = getattr(self, field)
            if url:
                if url.startswith("http://"):
                    url = "https://" + url[7:]
                    setattr(self, field, url)

                try:
                    url_validator(url)
                except ValidationError:
                    raise ValidationError(
                        {field: "Invalid URL. Allowed start line https:// "}
                    )

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")
