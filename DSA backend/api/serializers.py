from rest_framework import serializers
from .models import User,Department,Institution,Admin,Activity,Task,Asset,Comment,InstitutionRequest
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


class RequestUserSerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['staff_id','id','email']
    

class RequestSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = InstitutionRequest
        fields = '__all__' 
    
    def get_user(self,obj):
        user_request = obj.user
        serializer = RequestUserSerializer(user_request, many = False)
        return serializer.data

    def create(self, validated_data):
        request = self.context.get('request')
        for fieldname,field in self.fields.items():
            if fieldname not in validated_data :
                validated_data[fieldname] = ''
        institution_request = InstitutionRequest.objects.create(
            institution = validated_data['institution'],
            user = request.user,
            request_type = validated_data['request_type'],
            department_name = validated_data['department_name'],
            color = validated_data['color'],
            password = validated_data['password']
           )
        if institution_request.request_type == 'user_type':
            institution_request.request_info = 'Made a request to join'
        elif institution_request.request_type =='department_type':
            institution_request.request_info = 'Made a request to Create a department'
        institution_request.save()
        return institution_request
    
    def update(self, instance, validated_data):
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)

        if instance.request_type == 'user_type' and validated_data['is_approved'] == True:
            instance.user.institution  = instance.institution
            instance.user.save()
        elif instance.request_type == 'department_type' and validated_data['is_approved'] == True:
            department =  Department.objects.create(
                Institution = instance.institution,
                department_name = instance.department_name,
                color = instance.color

            )
            department.set_password(instance.password)
            department.save()
        instance.save()
        return instance
    

class UserSerializer(serializers.ModelSerializer):
    requests = serializers.SerializerMethodField()
    class Meta :
        model =User
        fields = ["id","institution","staff_id","email", "password","user_img", "requests"]
        extra_kwargs = {"password":{"write_only": True, "required": False}, "staff_id":{"required": False}, "email":{"required": False}}
    def get_requests(self,obj):
        requests = obj.institutionrequest_set.all()
        serializer = RequestSerializer(requests, many = True)
        return serializer.data
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
    
class ActivitySerializer(serializers.ModelSerializer):

    class Meta :
        model = Activity
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):

    class Meta :
        model = Task
        fields = '__all__'

    def validate(self, attrs):
        if not self.instance and not attrs.get("department"):
            raise serializers.ValidationError({'department':"Field cannot be empty"})
        if not self.instance and not attrs.get("task"):
            raise serializers.ValidationError({'task':"Field cannot be empty"})
        return super().validate(attrs)
    
    def create(self, validated_data):
        request = self.context.get('request')
        task = Task.objects.create(
            department = validated_data['department'],
            task = validated_data['task'],
        )
        Activity.objects.create(
            department = validated_data['department'],
            activity = f'{request.user.staff_id} Just created a task'
        )
        return task   
    

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta :
        model = Comment
        fields = '__all__'

    def validate(self, attrs):
        if not self.instance and not attrs.get("department"):
            raise serializers.ValidationError({'department':"Field cannot be empty"})
       
        if not self.instance and not attrs.get("comment"):
            raise serializers.ValidationError({'comment':"Field cannot be empty"})
        
        
        return super().validate(attrs)
    
    def get_user(self,obj):
        user = obj.user
        serializer = UserSerializer(user, many =False)
        return serializer.data

    
    def create(self,validated_data):
        request = self.context.get('request')
        comment = Comment.objects.create(
            department = validated_data['department'],
            comment = validated_data['comment'],
            user = request.user
        )
        return comment

    
class AssetSerializer(serializers.ModelSerializer):
    class Meta :
        model = Asset
        fields = ['department','asset_name','asset_quantity','last_edited','id']
        extra_kwargs = {'last_edited':{'read_only':True}}

    def validate(self, attrs):
        if not self.instance and not attrs.get("department"):
            raise serializers.ValidationError({'department':"Field cannot be empty"})
        if not self.instance and not attrs.get("asset_name"):
            raise serializers.ValidationError({'asset_name':"Field cannot be empty"})
        if not self.instance and not attrs.get("asset_quantity"):
            raise serializers.ValidationError({'asset_quantity':"Field cannot be empty"})

        return super().validate(attrs)
    
    def create(self,validated_data):
        request = self.context.get('request')
        asset = Asset.objects.create(
           asset_name = validated_data['asset_name'],
           department =validated_data['department'],
           asset_quantity = validated_data['asset_quantity'],
           last_edited = str(request.user.staff_id)

        )
        Activity.objects.create(
            department = validated_data['department'],
            activity = f'{request.user.staff_id} just created an asset'
        )
        return asset
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
       
        instance.asset_name = validated_data.get('asset_name', instance.asset_name)
        instance.asset_quantity = validated_data.get('asset_quantity', instance.asset_quantity)
        instance.lasted_edited = str(request.user.staff_id)
        instance.save()
        Activity.objects.create(
            department = instance.department,
            activity = f'{request.user.staff_id} just updated {instance.asset_name}'
        )
        return instance

class DepartmentSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()
    activities = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    assets = serializers.SerializerMethodField()
    class Meta :
        model = Department
        fields = ['id','Institution','department_name','password', 'color','department_profile','tasks','activities','comments','assets']
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
    
    def get_assets(self,obj):
        assets = obj.asset_set.all()
        serializer = AssetSerializer(assets, many = True)
        return serializer.data
    
    def get_tasks(self,obj):
        tasks = obj.task_set.all()
        serializer = TaskSerializer(tasks, many = True)
        return serializer.data
    
    def get_activities(self,obj):
        activities = obj.activity_set.all()
        serializer = ActivitySerializer(activities, many = True)
        return serializer.data
    
    def get_comments(self,obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many = True)
        return serializer.data

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
    requests = serializers.SerializerMethodField()
    class Meta :
        model = Institution
        fields = ["id", "institution_name", "institution_address","institution_contact", "institution_email","departments","users","admin", 'requests']
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
    
    def get_requests(self,obj):
        requests = obj.institutionrequest_set.filter(is_approved = False)
        serializer = RequestSerializer(requests, many = True)
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
        request = self.context.get('request')
        try:
            department = Department.objects.get(pk = id)
        except Department.DoesNotExist :
            raise serializers.ValidationError({'id': 'Department Id does not exist'})
        if not department.check_password(password):
            raise  AuthenticationFailed('Password Not correct')
        
        Activity.objects.create(
            department = department,
            activity = f'{request.user.staff_id} Just Logged in'
        )
        return department
    



    
    





    
    
    

    
        
        

    
    


 
   