from django.urls import path
from rest_framework import routers
from .views import UserViewset,UserLogin,UserRefresh,InstitutionViewset,DepartmentViewSet,DepartmentLogin



router = routers.DefaultRouter()

router.register("Userviewset", UserViewset , "userviewset")
router.register("Institution",InstitutionViewset,"institution")
router.register('Departments',DepartmentViewSet, 'departments')


urlpatterns = [
    path('login/', UserLogin.as_view()),
    path('refresh/',UserRefresh.as_view()),
    path('Departments/login/',DepartmentLogin.as_view() )
] + router.urls