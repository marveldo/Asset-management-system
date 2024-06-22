from rest_framework_simplejwt.tokens import AccessToken,RefreshToken, Token


class CustomAccesstoken(AccessToken):

    @classmethod
    def for_user(cls, user) :
        token = super().for_user(user)
        token["img"] = "http://127.0.0.1:8000/" +  str(user.user_img)
        return token
    
class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token["img"] = "http://127.0.0.1:8000/" +  str(user.user_img)
        return token