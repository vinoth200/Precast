from django.shortcuts import render

# Create your views here.
from django.shortcuts import render,redirect
from .models import *
from django.contrib import messages
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from django.views import View
from django.contrib import messages
from app.forms import CustomUserForm
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required


# Create your views here.

#Home Page
@login_required(login_url='login_page')
def home(request):
    pro = Project.objects.filter(status=0)
    precast = Precast.objects.filter(status=0)
    context = {'project': pro,'precast':precast,}
    return render(request, "index.html", context)

def test(request):
    return render(request, "test.html" )

def precast_view(request):
    # Retrieve all precast items
    precast_items = Precast.objects.all()
    print(precast_items )
    context = {'precast': precast_items}
    return render(request, 'index.html', context)
      # Retrieve all precast items

#Get precast from database
def get_precast(request, project_id):
    precast = Precast.objects.filter(project_id=project_id, status=0).values('precast_number', 'image', 'Yet_to_start', 'Design_done', 'Precast_done', 'Moving_to_site')
    precast = list(precast)
    print(precast)  # Add this line for debugging
    return JsonResponse(precast, safe=False)


# Sign In Page
def register(request):
    form = CustomUserForm()
    if request.method == 'POST':
        form =CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Register successfully")
            return redirect('login_page')
    context ={'form':form}
    return render(request,"auth/register.html",context)


# Login Page
def login_page(request):
    if request.user.is_authenticated:
        messages.warning(request,"you are already loggined")
        return redirect('home')
    else:
        if request.method == 'POST':
            name = request.POST.get('username')
            passwd = request.POST.get('password')
            
            user =authenticate(request, username=name, password=passwd)
            
            if user is not None:
                login(request, user)
                messages.success(request,"Logged in successfully")
                return redirect("home")
            else:
                messages.error(request,"invalid username or passweord")
                return redirect('login_page')
    return render(request,"auth/login.html")


#Logout Page
def logout_page(request):
    if request.user.is_authenticated:
        logout(request)
        messages.success(request,"Logged out successfully")
    return redirect('login_page')
    
