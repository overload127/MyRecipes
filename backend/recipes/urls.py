from django.urls import path

from recipes.view import (
    PublisherListView,
    RecipeDetailView,
)

app_name = "core"

urlpatterns = [
    path("", PublisherListView.as_view(), name="recipes"),
    path("<int:id>/", RecipeDetailView.as_view(), name="recipe"),
]
