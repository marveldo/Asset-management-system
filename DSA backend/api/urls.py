from django.urls import path
from rest_framework import routers
from .views import UserViewset,UserLogin,UserRefresh,InstitutionViewset,DepartmentViewSet,DepartmentLogin,Taskviewset,AssetModelviewset,Commentviewset,RequestViewSet



router = routers.DefaultRouter()

router.register("Userviewset", UserViewset , "userviewset")
router.register("Institution",InstitutionViewset,"institution")
router.register('Departments',DepartmentViewSet, 'departments')
router.register('Tasks',Taskviewset,'tasks')
router.register('Assets',AssetModelviewset, 'assets')
router.register('Comments',Commentviewset, 'comments')
router.register('Requests',RequestViewSet, 'requests')


urlpatterns = [
    path('login/', UserLogin.as_view()),
    path('refresh/',UserRefresh.as_view()),
    path('Departments/login/',DepartmentLogin.as_view() )
] + router.urls