from typing import Any
from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser, PermissionsMixin
from phonenumber_field.modelfields import PhoneNumberField
import uuid
from django.contrib.auth.hashers import make_password,check_password

class CustomUserManager(BaseUserManager):


      def create_user(self, staff_id, email=None, password=None, **extra_fields):
            if not staff_id :
                  raise ValueError("Staff id is needed")
            if not email :
                  raise ValueError("Email is needed")
            
            self.normalize_email(email)
            user = self.model(staff_id = staff_id ,email = email, **extra_fields)
            user.set_password(password)
            user.save()
            return user
      
      def create_superuser(self, staff_id, email=None, password=None, **extra_fields):
            
            extra_fields.setdefault('is_admin', True)
            extra_fields.setdefault('is_superuser', True)
            extra_fields.setdefault('is_staff',True)
            extra_fields.setdefault("is_active", True)

            if extra_fields.get("is_admin") is not True :
                  raise ValueError("Superuser must have is_admin set to true")
            if extra_fields.get("is_superuser") is not True :
                  raise ValueError("Superuser must have is_superuser set to true")
            if extra_fields.get("is_staff") is not True:
                  raise ValueError("Superuser must have is_staff set to true")
            
            return self.create_user(staff_id,email, password, **extra_fields)
      

class Institution(models.Model):
      
      institution_name = models.CharField(max_length=500)
      institution_address = models.TextField()
      institution_contact = PhoneNumberField(blank = True , null = True, unique=True)
      institution_email = models.EmailField()
      id = models.UUIDField(default=uuid.uuid4 , editable = False ,unique=True, primary_key=True)
    

      def __str__(self):
            return str(self.institution_name)
      
class ColourChoices(models.TextChoices):
      RED = 'red'
      YELLOW = 'yellow'
      BLUE = 'blue'
      ORANGE = 'orange'
      INDIGO = 'indigo'
      GREEN = 'green'
      PURPLE = 'purple'

class Department(models.Model):

      Institution = models.ForeignKey(Institution, blank = True , null=True, on_delete=models.CASCADE )
      department_name = models.CharField(max_length=500, blank=True, null=True)
      id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
      color = models.CharField(max_length=250, blank=True, null=True, choices=ColourChoices.choices)
      password = models.CharField(max_length=1000, blank = True, null =True)
      department_profile = models.ImageField(blank = True , null = True, default='images/Departmentdefault.svg', upload_to='images/departments')


      def set_password(self, password):
            self.password = make_password(password)
            self.save()

      def check_password(self,password):
            return check_password(password,self.password)

      
      def __str__(self):
            return f'{self.department_name} of {self.Institution}'

class User(AbstractBaseUser, PermissionsMixin):
      institution = models.ForeignKey(Institution, blank=True, null=True, on_delete=models.SET_NULL)
      user_img = models.ImageField(blank = True, null = True , default='images/default.svg', upload_to='images')
      staff_id = models.CharField(unique=True, max_length=300)
      email = models.EmailField(unique = True)
      is_staff = models.BooleanField(default=False)
      is_admin = models.BooleanField(default=False)
      is_active = models.BooleanField(default=True)
      is_superuser = models.BooleanField(default=False)
      id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True , unique=True)

      def __str__(self):
            return str(self.staff_id)
      
      USERNAME_FIELD = "staff_id"

      REQUIRED_FIELDS = ["email"]

      objects = CustomUserManager()



class Admin(models.Model):
      user = models.OneToOneField(User, on_delete=models.CASCADE)
      institution = models.OneToOneField(Institution, on_delete=models.CASCADE)


      def __str__(self):
            return f'{self.user}  is admin of {self.institution}'




                  
             

