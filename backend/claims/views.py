from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User

class UserCreateView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"message": "Email is required"},status=status.HTTP_400_BAD_REQUEST,)
        user, created = User.objects.get_or_create(email=email)
        if created:
            return Response(
                {"message": "User created successfully","email": user.email,},status=status.HTTP_201_CREATED,)
        return Response({"message": "User already exists","email": user.email,},status=status.HTTP_200_OK,)