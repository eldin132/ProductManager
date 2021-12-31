from django.shortcuts import render
from django.views import View

class PMSDashboard(View):
    def get(self, request, *args, **kwargs):
        return render(request, "dashboard/home.html")
