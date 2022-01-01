from django.db import models

class Product(models.Model):

    CATEGORY =  (
        ('Pillow', 'Pillow'),
        ('Food', 'Food'),
        ('Toys', 'Toys'),
    )

    name = models.CharField(max_length=50)
    date_added = models.DateTimeField(auto_now_add=True, null=True)
    product_code = models.CharField(max_length=10, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField(blank=True, null=True)
    category = models.CharField(max_length=10, null=True, choices=CATEGORY)

    def __str__(self):
        return self.name