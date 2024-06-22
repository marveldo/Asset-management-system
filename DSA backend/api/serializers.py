from rest_framework import serializers
from .models import User,Department,Institution,Admin
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from django.conf import settings
from .utils import CustomRefreshToken
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

class CustomObtainPairserializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["img"] =  "http://127.0.0.1:8000/" +  str(user.user_img)
        return token
    

class CustomRefreshSerializer(TokenRefreshSerializer):
    token_class = CustomRefreshToken
    



class UserSerializer(serializers.ModelSerializer):

    class Meta :
        model =User
        fields = ["id","institution","staff_id","email", "password","user_img"]
        extra_kwargs = {"password":{"write_only": True, "required": False}, "staff_id":{"required": False}, "email":{"required": False}}

    def validate(self, attrs):
        if not self.instance and not attrs.get("staff_id"):
            raise serializers.ValidationError({"staff_id":"Staff_id is needed"})
        if not self.instance and not attrs.get("email"):
            raise serializers.ValidationError({"email":"Email is needed"})
        if not self.instance and not attrs.get("password"):
            raise serializers.ValidationError({"password":"Password is needed"})
        return super().validate(attrs)
    
    
    def create(self, validated_data):
        user = User(
            staff_id = validated_data["staff_id"],
            email = validated_data["email"],
        )
        user.set_password(validated_data["password"])

        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.institution = validated_data.get("institution", instance.institution)
        instance.staff_id = validated_data.get("staff_id",instance.staff_id)
        instance.email = validated_data.get("email", instance.email)

        if "user_img" in validated_data:
            instance.user_img = validated_data.get("user_img", instance.user_img)

        if 'password' in validated_data :
            instance.set_password(validated_data.get('password', instance.password))
        
        instance.save()

        return instance
    

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta :
        model = Department
        fields = ['id','Institution','department_name','password', 'color','department_profile']
        extra_kwargs = {"password":{"write_only":True, "required":False}}

    def validate(self, attrs):
        if not self.instance and not attrs.get("department_name"):
            raise serializers.ValidationError({"department_name":"This field is required"})
        if not self.instance and not attrs.get("Institution"):
            raise serializers.ValidationError({"Institution":"This field is required"})
        if not self.instance and not attrs.get("password"):
            raise serializers.ValidationError({"password":"Password is required for a department"})
        if not self.instance and not attrs.get("color"):
            raise serializers.ValidationError({'color': "Color is required for a department"})
        return super().validate(attrs)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['department_profile'] = "http://127.0.0.1:8000/" + str(instance.department_profile)
        return data

    def create(self, validated_data):
        department = Department(
            department_name = validated_data['department_name'],
            Institution = validated_data["Institution"],
            color = validated_data["color"]
        )
        department.set_password(validated_data['password'])
        department.save()
        return department
    
    def update(self, instance, validated_data):
        instance.Institution = validated_data.get("Institution",instance.Institution)
        instance.department_name = validated_data.get("department_name", instance.department_name)
        instance.color = validated_data.get('color', instance.color)

        if "department_profile" in validated_data:
            instance.department_profile = validated_data.get('department_profile', instance.department_profile)

        if "password" in validated_data :
            instance.set_password(validated_data.get("password", instance.password))

        instance.save()

        return instance
    

class AdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = Admin
        fields = ["user"]
    
class InstitutionSerializer(serializers.ModelSerializer):
    departments = serializers.SerializerMethodField()
    users = serializers.SerializerMethodField()
    admin = serializers.SerializerMethodField()
    class Meta :
        model = Institution
        fields = ["id", "institution_name", "institution_address","institution_contact", "institution_email","departments","users","admin"]
        extra_kwargs = {
            "institution_name":{"required":False}, 
            "institution_address":{"required":False}, 
            "institution_email":{"required":False},
        }
    def validate(self, attrs):
        if not self.instance and not attrs.get("institution_name"):
            raise serializers.ValidationError({"institution_name": "This Field is required" })
        if not self.instance and not attrs.get("institution_address"):
            raise serializers.ValidationError({"institution_address":"This Field is required"})
        if not self.instance and not attrs.get("institution_email"):
            raise serializers.ValidationError({"institution_email": "This Field is required"})
        
        return super().validate(attrs)
    
    def create(self, validated_data):
        request = self.context.get('request')
        institution = Institution(
            institution_name = validated_data['institution_name'],
            institution_address = validated_data['institution_address'],
            institution_contact = validated_data['institution_contact'],
            institution_email = validated_data['institution_email']
        )
        institution.save()
        request.user.institution = institution
        request.user.save()
        Admin.objects.create(user = request.user , institution = institution)
        return institution
    
    def get_departments(self,obj):
        departments = obj.department_set.all()
        serializer = DepartmentSerializer(departments, many = True)
        return serializer.data
    
    def get_users(self,obj):
        users = obj.user_set.all()
        serializer = UserSerializer(users, many=True)
        return serializer.data
    
    def get_admin(self,obj):
        try:
           admin = obj.admin
        except :
            admin = None
        serializer = AdminSerializer(admin , many = False)
        return serializer.data
    
class DepartmentalLogin(serializers.Serializer):

    id = serializers.CharField(required = True)
    password = serializers.CharField(required = True, write_only = True)
    department_name = serializers.CharField(required = False, read_only =True)
    color = serializers.CharField(required = False, read_only = True )
    default_error_messages ={'detail': "Wrong password given"}
    





    def validate(self, attrs):
        id = attrs.get('id')
        password = attrs.get('password')
        

        try:
            department = Department.objects.get(pk = id)
        except Department.DoesNotExist :
            raise serializers.ValidationError({'id': 'Department Id does not exist'})
        if not department.check_password(password):
            raise  AuthenticationFailed('Password Not correct')

        return department
    
        
        

    
    


 
   