from django.urls import path
from dashboard import views

urlpatterns = [
    path('', views.PMSDashboard.as_view(), name='home'),
    path('create/', views.product_create, name='product-create'),
    path('products/<int:pk>/update', views.product_update, name='product-update'),
    path('products/<int:pk>/delete', views.product_delete, name='product-delete'),
    path('products/delete-all', views.product_mass_delete, name="product-delete-all"),
    path('products/<int:pk>/show', views.show_product, name="show-product"),
]