from django.contrib import admin

# Register your models here.


from django import template

register = template.Library()

@register.filter
def to_and(value):
    return value.replace("&","and")