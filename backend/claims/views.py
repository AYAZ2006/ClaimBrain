import base64
import os
import cv2
import numpy as np
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ultralytics import YOLO
from .models import User
MODEL_PATH = os.path.join(settings.BASE_DIR, "Models", "best.pt")
model = YOLO(MODEL_PATH)

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

class CarDamageAnalysisView(APIView):
    def post(self, request):
        if "image" not in request.FILES:
            return Response({"error": "No image provided"},status=status.HTTP_400_BAD_REQUEST,)
        image_file = request.FILES["image"]
        file_bytes = np.frombuffer(image_file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        results = model.predict(source=image, conf=0.25)[0]
        detected_damages = []
        valid_indices = []
        if results.boxes is not None:
            for i, box in enumerate(results.boxes):
                cls_id = int(box.cls[0].item())
                confidence = float(box.conf[0].item())
                class_name = model.names[cls_id]
                if class_name == "glass_shatter" and confidence < 0.90:
                    continue
                if class_name == "dent" and confidence >= 0.40:
                    continue
                if class_name == "lamp_broken" and confidence >= 0.60:
                    continue
                valid_indices.append(i)
                detected_damages.append({"damage_type": class_name,"confidence": round(confidence * 100, 2),})
        filtered_results = results[valid_indices]
        annotated_img = filtered_results.plot(line_width=2)
        _, buffer = cv2.imencode(".jpg", annotated_img)
        base64_image = base64.b64encode(buffer).decode("utf-8")
        return Response({"success": True,"damages": detected_damages,"image_base64": f"data:image/jpeg;base64,{base64_image}",},status=status.HTTP_200_OK,)