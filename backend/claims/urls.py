from django.urls import path
from .views import UserCreateView

urlpatterns = [
    path("save-user/", UserCreateView.as_view(), name="save-user"),
]