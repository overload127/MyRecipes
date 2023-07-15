import logging

from django.http import Http404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


logger = logging.getLogger(__name__)
logger.info("Start Recipes")


pre_db = {
    "recipes": [
        {
            "id": 0,
            "author_name": "Admin",
            "name": "Самый вкусный Шавуха 1!",
            "description": """Шаверма по стандартному рецепту. (Самый простой соус)""",
            "mean_rating": 1,
            "ingredients": ["Морковь 0.5кг", "Картофель 1 кг"],
            "user_rating": None,
            "steps": [
                {
                    "id": 0,
                    "label": "Шаг 1",
                    "mean_time": 360,
                    "description": "Достать и помыть картошку с морковью. Почистить её ножем. Помыть. Нарезать кубиками.",
                },
            ],
            "food_energy": {
                "fat": 10,
                "ethanol": 20,
                "proteins": 11,
                "carbohydrates": 19,
                "organicAcids": 12,
                "polyols": 18,
                "fiber": 13,
            },
        },
        {
            "id": 1,
            "author_name": "Admin",
            "name": "Delicious Shakshuka",
            "description": "A flavorful and hearty dish.",
            "mean_rating": 4.5,
            "ingredients": ["Onion", "Red bell pepper", "Garlic", "Tomatoes", "Eggs"],
            "user_rating": None,
            "steps": [
                {
                    "id": 0,
                    "label": "Step 1",
                    "mean_time": 20,
                    "description": "Heat olive oil in a pan. Sauté onion, red bell pepper, and garlic until softened.",
                },
                {
                    "id": 1,
                    "label": "Step 2",
                    "mean_time": 15,
                    "description": "Add tomatoes and cook until they break down. Season with salt, pepper, and spices.",
                },
                {
                    "id": 2,
                    "label": "Step 3",
                    "mean_time": 10,
                    "description": "Create wells in the tomato mixture and crack eggs into them. Cover and cook until eggs are done to your liking.",
                },
            ],
            "food_energy": {
                "fat": 8,
                "ethanol": 0,
                "proteins": 12,
                "carbohydrates": 10,
                "organicAcids": 2,
                "polyols": 0,
                "fiber": 4,
            },
        },
        {
            "id": 2,
            "author_name": "Admin",
            "name": "Creamy Mushroom Pasta",
            "description": "A rich and satisfying pasta dish.",
            "mean_rating": 3.8,
            "ingredients": ["Pasta", "Mushrooms", "Garlic", "Cream", "Parmesan cheese"],
            "user_rating": None,
            "steps": [
                {
                    "id": 0,
                    "label": "Step 1",
                    "mean_time": 10,
                    "description": "Cook pasta according to package instructions. Drain and set aside.",
                },
                {
                    "id": 1,
                    "label": "Step 2",
                    "mean_time": 15,
                    "description": "Sauté mushrooms and garlic in butter until golden brown.",
                },
                {
                    "id": 2,
                    "label": "Step 3",
                    "mean_time": 5,
                    "description": "Add cream to the mushrooms and simmer until thickened. Stir in Parmesan cheese.",
                },
            ],
            "food_energy": {
                "fat": 15,
                "ethanol": 0,
                "proteins": 9,
                "carbohydrates": 20,
                "organicAcids": 1,
                "polyols": 0,
                "fiber": 3,
            },
        },
        {
            "id": 3,
            "author_name": "Admin",
            "name": "Spicy Thai Curry",
            "description": "A fiery and aromatic curry dish.",
            "mean_rating": 4.2,
            "ingredients": [
                "Chicken",
                "Coconut milk",
                "Red curry paste",
                "Bell peppers",
                "Basil leaves",
            ],
            "user_rating": None,
            "steps": [
                {
                    "id": 0,
                    "label": "Step 1",
                    "mean_time": 15,
                    "description": "Heat oil in a pan. Sauté chicken until browned.",
                },
                {
                    "id": 1,
                    "label": "Step 2",
                    "mean_time": 10,
                    "description": "Add red curry paste and cook for a minute to release its flavors.",
                },
                {
                    "id": 2,
                    "label": "Step 3",
                    "mean_time": 20,
                    "description": "Pour in coconut milk and simmer until the chicken is cooked through. Add bell peppers and basil leaves.",
                },
            ],
            "food_energy": {
                "fat": 18,
                "ethanol": 0,
                "proteins": 15,
                "carbohydrates": 8,
                "organicAcids": 0,
                "polyols": 0,
                "fiber": 5,
            },
        },
    ],
}


db = {"recipes": []}

for i in range(55):
    index_select = i % len(pre_db["recipes"])
    find_recipe = [
        _recipe for _recipe in pre_db["recipes"] if _recipe["id"] == index_select
    ][0].copy()
    find_recipe["id"] = i
    db["recipes"].append(find_recipe)


class RecipeDetailView(APIView):
    def get(self, request, id):
        find_recipe = [_recipe for _recipe in db["recipes"] if _recipe["id"] == id]
        if not find_recipe or len(find_recipe) == 0:
            raise Http404

        return Response(find_recipe[0], status=status.HTTP_200_OK)


class PublisherListView(APIView):
    def get(self, request):
        try:
            page = int(request.query_params.get("page", "0"))
        except Exception:
            page = 0
        try:
            is_desc = bool(int(request.query_params.get("is_desc", "0")))
        except Exception:
            is_desc = False
        try:
            per_page = int(request.query_params.get("per_page", "5"))
        except Exception:
            per_page = 5

        if is_desc:
            filter_db = db["recipes"][-page * per_page : -page * per_page - per_page]
        else:
            filter_db = db["recipes"][page * per_page : page * per_page + per_page]

        return Response(
            {
                "page": page,
                "is_desc": is_desc,
                "total": len(db["recipes"]),
                "per_page": per_page,
                "recipes": filter_db,
            },
            status=status.HTTP_200_OK,
        )
