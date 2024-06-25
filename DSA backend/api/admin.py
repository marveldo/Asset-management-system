from django.contrib import admin
from .models import *



admin.site.register(User)
admin.site.register(Institution)
admin.site.register(Admin)
admin.site.register(Department)
admin.site.register(Activity)
admin.site.register(Comment)
admin.site.register(Task)
admin.site.register(Asset)
admin.site.register(InstitutionRequest)

# Register your models here.
