from django.urls import path
from dashboard import views

urlpatterns = [
    path('', views.PMSDashboard.as_view(), name='home'),
]