from rest_framework import viewsets
from .serializers import UserSerializer,CustomObtainPairserializer,CustomRefreshSerializer,InstitutionSerializer,DepartmentSerializer,DepartmentalLogin,AssetSerializer,Activity,CommentSerializer,TaskSerializer,RequestSerializer
from .models import User,Institution,Department,Asset,Comment,Task,InstitutionRequest
from rest_framework import generics
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .utils import CustomAccesstoken,CustomRefreshToken


# Create your views here.

class UserLogin(TokenObtainPairView):
    serializer_class = CustomObtainPairserializer

class UserRefresh(TokenRefreshView):
    serializer_class = CustomRefreshSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        permission_classes = self.permission_classes
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        if self.action == 'list':
            permission_classes = [permissions.IsAdminUser]
        if self.action == 'retrieve':
            permission_classes = [permissions.IsAdminUser]
        if self.action == 'destroy':
            permission_classes  = [permissions.IsAdminUser]
        if self.action == 'update':
            permission_classes = [permissions.IsAdminUser]
        if self.action == 'partial_update' :
            permission_classes = [permissions.IsAdminUser]
        if self.action == 'me':
            permission_classes = [permissions.IsAuthenticated]
    
        
        return (permission() for permission in permission_classes)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid(raise_exception = True):
            serializer.save()
            user = serializer.instance
            headers = self.get_success_headers(serializer.data)
            access= CustomAccesstoken.for_user(user)
            refresh = CustomRefreshToken.for_user(user)
            res = {
                "access" : str(access),
                "refresh" : str(refresh)
            }
            return Response(res, status=status.HTTP_201_CREATED, headers=headers)

        
    
    @action(detail=False , methods=['get','put','delete'])
    def me(self,request):
        if request.method == 'GET':
           user = request.user
           serializer = self.get_serializer(user, many = False)
           return Response(serializer.data, status=status.HTTP_200_OK)
        if request.method == 'PUT':
            user = request.user
            serializer = self.get_serializer(user, data = request.data, partial = True)
            if serializer.is_valid(raise_exception = True):
                self.perform_update(serializer=serializer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
        if request.method == 'DELETE':
            user = request.user
            self.perform_destroy(user)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
class InstitutionViewset(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.GET.get('institution_name'):
            queryset = queryset.filter(institution_name__icontains = self.request.GET.get('institution_name'))

        return queryset

    def list(self, request, *args, **kwargs):
        institutions = self.get_queryset()
        serializer = self.get_serializer(institutions, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data, context = {'request': request})
        if serializer.is_valid(raise_exception = True):
            self.perform_create(serializer=serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAuthenticated]

class DepartmentLogin(generics.GenericAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentalLogin
    permission_classes = [permissions.IsAuthenticated]


    def post(self, request):
        serializer = self.get_serializer(data = request.data , context = {'request': request})
        if serializer.is_valid(raise_exception = True):
            return Response(serializer.data)
        else :
            return Response(serializer.errors,status=status.HTTP_401_UNAUTHORIZED)
        
class AssetModelviewset(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes =[permissions.IsAuthenticated]

        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        Activity.objects.create(
            department = instance.department,
            activity = f'{request.user.staff_id} deleted {instance.asset_name}'
        )
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class Commentviewset(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.data, context = {'request' : request})
        if serializer.is_valid(raise_exception = True):
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class Taskviewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data, context = {'request': request})
        if serializer.is_valid(raise_exception = True):
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class RequestViewSet(viewsets.ModelViewSet):
    queryset = InstitutionRequest.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [permissions.IsAuthenticated]

 





    

   




    






