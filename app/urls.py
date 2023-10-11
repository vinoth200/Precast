from django.urls import path
from . import views
from .views import *
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.home,name='home'),
    path('test',views.test,name='test'),
    path('get_precast/<int:project_id>/',views.get_precast, name='get_precast'),
    path('loginpage/',views.login_page,name='login_page'),
    path('register/',views.register,name='register'),
    path('logout/',views.logout_page,name='logout_page'),
    path('precast/',views.precast_view, name='precast_view'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)