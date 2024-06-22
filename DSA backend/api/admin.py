from django.contrib import admin
from .models import *



admin.site.register(User)
admin.site.register(Institution)
admin.site.register(Admin)
admin.site.register(Department)

# Register your models here.
