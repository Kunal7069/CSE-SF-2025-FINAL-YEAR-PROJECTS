from django import forms
from django.contrib.auth.models import User
from . import models

class TeacherUserForm(forms.ModelForm):
    class Meta:
        model=User
        fields=['first_name','last_name','username','password']
        widgets = {
        'password': forms.PasswordInput()
        }

class TeacherForm(forms.ModelForm):
    class Meta:
        model=models.Teacher
        fields=['address','mobile','profile_pic']


class BlogForm(forms.ModelForm):
    class Meta:
        model=models.Blog
        fields=['blog_tittle','blog_img','blog_description']


class MaterialForm(forms.ModelForm):
    class Meta:
        model=models.Material
        fields=['material_tittle','material_file','material_description']
