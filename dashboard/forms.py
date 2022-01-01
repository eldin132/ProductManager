from django.forms import ModelForm
from dashboard.models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ('name', 'product_code', 'price', 'quantity', 'category')