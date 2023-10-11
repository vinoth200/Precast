from django.db import models
from django.contrib.auth.models import User
import datetime,os

# Create your models here.

def get_file_path(request, filename):
    original_filename = filename
    nowTime = datetime.datetime.now().strftime('%Y%m%d%H:%M:%S')
    filename = "%s%s" % (nowTime,original_filename)
    return os.path.join('uploads/', filename)

    
class Project(models.Model):
    number_of_project =models.CharField(max_length=150, null=False, blank=False)
    project_name=models.CharField(max_length=100,null=False,blank=False)
    project_location=models.CharField(max_length=100,null=False,blank=False)
    status = models.BooleanField(default=False, help_text="0=default, 1=Hidden")

    def __str__(self):
        return str(self.project_name)
    
class Precast(models.Model):
    project = models.ForeignKey(Project,on_delete=models.CASCADE)
    precast_number =models.CharField(max_length=100, null=False, blank=False)
    precast_name = models.CharField(max_length=100, null=True, blank=True)
    image =models.ImageField( upload_to=get_file_path, null=True, blank=True)
    description =models.TextField(max_length=500,null=True,blank=True)
    status = models.BooleanField(default=False, help_text="0=default, 1=Hidden")
    Yet_to_start=models.BooleanField(default=False,help_text="0=default,1=show_status")
    Design_done=models.BooleanField(default=False,help_text="0=default,1=show_status")
    Precast_done=models.BooleanField(default=False,help_text="0=default,1=show_status")
    Moving_to_site=models.BooleanField(default=False,help_text="0=default,1=show_status")

    
    def __str__(self):
       return str(self.precast_number)
    