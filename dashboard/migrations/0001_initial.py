# Generated by Django 3.1.4 on 2022-01-01 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('date_added', models.DateTimeField(auto_now_add=True, null=True)),
                ('product_code', models.CharField(blank=True, max_length=10)),
                ('price', models.DecimalField(decimal_places=2, max_digits=5)),
                ('quantity', models.IntegerField(blank=True, null=True)),
                ('category', models.CharField(choices=[('Pillow', 'Pillow'), ('Food', 'Food'), ('Toys', 'Toys')], max_length=10, null=True)),
            ],
        ),
    ]