from django.contrib.auth.forms import UserCreationForm
from .models import User
from django import forms

class CustomUserForm(UserCreationForm):
    username =forms.CharField(widget=forms.TextInput)
    email =forms.CharField(widget=forms.TextInput)
    password1 =forms.CharField(widget=forms.TextInput)
    password2 =forms.CharField(widget=forms.TextInput)
    class Meta:
        model= User
        fields = ['username', 'email', 'password1', 'password2']