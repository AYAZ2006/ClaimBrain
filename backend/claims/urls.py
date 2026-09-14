from django.urls import path
from .views import UserCreateView,CarDamageAnalysisView

urlpatterns = [
    path("save-user/", UserCreateView.as_view(), name="save-user"),
    path("analyze-damage/", CarDamageAnalysisView.as_view(), name="analyze-damage"),
]