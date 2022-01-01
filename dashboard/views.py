from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from dashboard.models import Product
from dashboard.forms import ProductForm
from django.http import JsonResponse, HttpResponse
from django.template.loader import render_to_string
import json

class PMSDashboard(View):
    def get(self, request, *args, **kwargs):
        products = Product.objects.all()
        total_products = products.count()
        context = {}
        context = {
            'products': products,
            'total_products': total_products
        }

        return render(request, "dashboard/home.html", context)

def save_product_form(request, form, template_name):
    data = dict()
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            data['form_is_valid'] = True
            products = Product.objects.all()
            total_products = products.count()
            data['total_products'] = total_products
            data['html_product_list'] = render_to_string("dashboard/partial_product_list.html",{'products': products})
        else:
            data['form_is_valid'] = False
    context = {'form': form}
    data['html_form'] = render_to_string(template_name, context, request = request)
    return JsonResponse(data)

def product_create(request):
    if request.method == 'POST':
        form = ProductForm(request.POST)
    else:
        form = ProductForm()
    return save_product_form(request, form, 'dashboard/partial_product_create.html')

def product_update(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
    else:
        form = ProductForm(instance=product)
    return save_product_form(request, form, 'dashboard/partial_product_update.html')

def product_delete(request, pk):
    product = get_object_or_404(Product, pk=pk)
    data = dict()
    if request.method == 'POST':
        product.delete()
        data['form_is_valid'] = True
        products = Product.objects.all()
        data['html_product_list'] = render_to_string('dashboard/partial_product_list.html', {'products': products})
    else:
        context = {'product': product}
        data['html_form'] = render_to_string('dashboard/partial_product_delete.html', context, request=request)
    return JsonResponse(data)

def product_mass_delete(request):
    data = dict()
    if request.method == 'POST':
        pks = request.POST.getlist('checks[]')

        for pk in pks:
            product = get_object_or_404(Product, pk=pk)
            product.delete()
        
        data['form_is_valid'] = True
        products = Product.objects.all()
        data['html_product_list'] = render_to_string('dashboard/partial_product_list.html', {'products': products})

    else:
       form = ProductForm()
       context = {'form': form}
       data['form_is_vald'] = False
       data['html_form'] = render_to_string('dashboard/partial_product_delete_all.html', context, request=request)
    
    return JsonResponse(data)