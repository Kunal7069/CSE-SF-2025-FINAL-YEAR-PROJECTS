from operator import mod
from django.db import models
from django.contrib.auth.models import User

class Teacher(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    profile_pic= models.ImageField(upload_to='profile_pic/Teacher/',null=True,blank=True)
    address = models.CharField(max_length=40)
    mobile = models.CharField(max_length=20,null=False)
    status= models.BooleanField(default=False)
    salary=models.PositiveIntegerField(null=True)
    @property
    def get_name(self):
        return self.user.first_name+" "+self.user.last_name
    @property
    def get_instance(self):
        return self
    def __str__(self):
        return self.user.first_name




class Blog(models.Model):
    blog_tittle = models.CharField(max_length=100,null=False)
    blog_img= models.ImageField(upload_to='blogs/',null=True,blank=True)
    blog_description = models.CharField(max_length=1000)



class Material(models.Model):
    material_tittle = models.CharField(max_length=100,null=False)
    material_file= models.FileField(upload_to='study_material\\',null=True,blank=True)
    material_description = models.CharField(max_length=1000)
