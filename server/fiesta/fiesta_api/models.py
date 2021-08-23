from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import datetime
from polymorphic.models import PolymorphicModel
from polymorphic.managers import PolymorphicManager, PolymorphicQuerySet
from random import randint

from rest_framework import serializers

# Create your models here
class User(AbstractUser):
    '''extending User class'''
    email = models.EmailField(max_length=254, unique=True, blank=True)
    email_verified = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number =  models.CharField(max_length=35, unique=True)
    phone_number_verified =  models.BooleanField(default=False)

class GenericActivityQuerySet(PolymorphicQuerySet):
    def random(self):
        count = self.aggregate(count=models.Count('id'))['count']
        random_index = randint(0, count - 1)
        return self.all()[random_index]
        
# class GenericActivityManager(PolymorphicManager):
#     queryset_class = GenericActivityQuerySet.as_manager()

class GenericActivity(PolymorphicModel):
    objects = GenericActivityQuerySet.as_manager()
    name = models.CharField(max_length=400)
    location = models.ForeignKey('Location', on_delete=models.CASCADE)
    updated_at = models.DateTimeField(auto_now=True)
    website = models.CharField(max_length=500, blank=True)
    tag_one = models.CharField(max_length=75, blank=True, null=True)
    tag_two = models.CharField(max_length=75, blank=True,  null=True)
    tag_three = models.CharField(max_length=75, blank=True,  null=True)
    review_count = models.IntegerField(blank=True, null=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    price = models.CharField(max_length=8, blank=True, null=True)
    alias = models.CharField(max_length=100, blank=True,  null=True)
    active = models.BooleanField(default=True)

class Activity(GenericActivity):
    google_place_id = models.CharField(max_length=250, unique=True)
    # availability_text = models.CharField(max_length=300)

class Restaurant(GenericActivity):
    yelp_id = models.CharField(max_length=150, unique=True)
    open_table_id = models.CharField(max_length=15, default='-1')
    last_open_table_update = models.DateTimeField(null=True, blank=True)


class Drinks(GenericActivity):
    yelp_id = models.CharField(max_length=150, unique=True)
    open_table_id = models.CharField(max_length=15, default='-1')
    last_open_table_update = models.DateTimeField(null=True, blank=True)

class Dessert(GenericActivity):
    yelp_id = models.CharField(max_length=150, unique=True)
    open_table_id = models.CharField(max_length=15, default='-1')
    last_open_table_update = models.DateTimeField(null=True, blank=True)

class Location(models.Model):
    longitude = models.DecimalField(max_digits=15, decimal_places=10, blank=True)
    latitude = models.DecimalField(max_digits=15, decimal_places=10, blank=True)
    formatted_address = models.CharField(max_length=500, blank=True)
    zip_code = models.IntegerField(default=0)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50, default="US")
    neighborhood = models.CharField(max_length=100, blank=True)
    address1 = models.CharField(max_length=300, blank=True)
    address2 = models.CharField(max_length=300, blank=True, null=True)
    address3 = models.CharField(max_length=300, blank=True, null=True)

#------------------------------------- SERIALIZERS -----------------------------------------

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id','yelp_id', 'name', 'website', 'tag_one', 'review_count', 'rating','image_url','phone_number', 'price', 'alias','active', 'open_table_id', 'last_open_table_update']

class DrinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drinks
        fields = ['id','yelp_id', 'name', 'website', 'tag_one', 'review_count', 'rating','image_url','phone_number', 'price', 'alias','active', 'open_table_id', 'last_open_table_update']

class DessertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dessert
        fields = ['id','yelp_id', 'name', 'website', 'tag_one', 'review_count', 'rating','image_url','phone_number', 'price', 'alias','active', 'open_table_id', 'last_open_table_update']

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id','google_place_id', 'name', 'website', 'tag_one', 'review_count', 'rating','image_url','phone_number', 'price', 'alias','active']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id','longitude','latitude','formatted_address','zip_code','city','state','country','neighborhood','address1','address2','address3']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'email_verified','updated_at', 'phone_number','phone_number_verified']

#------------------------------------- NOT USED -----------------------------------------

# class Event(models.Model):
#     host = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#     )
#     name =  models.CharField(max_length=200)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     start_time = models.DateTimeField(default=None, blank=True, null=True)
#     end_time = models.DateTimeField(default=None, blank=True, null=True)
#     published_at = models.DateTimeField(default=None, blank=True, null=True)
#     location = models.CharField(max_length=500, default='')
#     description = models.CharField(max_length=1000, default='')

#     def __str__(self):
#         return self.name
    
#     def started(self):
#         return self.start_time != None

#     def ended(self):
#         return self.end_time != None
#         # return time > start and time < end


# class Invite(models.Model):
#     event = models.ForeignKey(
#         'Event',
#         on_delete=models.CASCADE,
#     )
#     invitee = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name="invitee"
#     )
#     inviter = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#         related_name="inviter"
#     )

# class Post(models.Model):
#     event = models.ForeignKey(
#         'Event',
#         on_delete=models.CASCADE,
#     )
#     uploaded_by = models.ForeignKey(
#         settings.AUTH_USER_MODEL,
#         on_delete=models.CASCADE,
#     )
#     POST_CHOICES = [
#         ('PH', 'Photo'),
#         ('VI', 'Video'),
#         ('GF', 'Gif')
#     ]

#     post_type = models.CharField(
#         max_length=2,
#         choices=POST_CHOICES,
#         default='PH',
#     )
#     url = models.CharField(max_length=100)
