"""fiesta URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),
    path('generate_restaurant_data', views.generate_restaurant_data, name='generate_restaurant_data'),
    path('add_event_metadata', views.add_event_metadata_csv, name='add_event_metadata'),
    path('update_restaurants_from_csv', views.update_restaurants_from_csv, name='update_restaurants_from_csv'),
    path('update_activity_from_csv', views.update_activity_from_csv, name='update_activity_from_csv'),
    path('pathfinder', views.pathfinder, name="pathfinder"),
    path('get_shuffle', views.get_shuffle, name="get_shuffle"),

]
