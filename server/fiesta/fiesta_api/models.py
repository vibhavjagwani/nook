from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import datetime

# Create your models here.
class Event(models.Model):
    host = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name =  models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_time = models.DateTimeField(default=None, blank=True, null=True)
    end_time = models.DateTimeField(default=None, blank=True, null=True)
    published_at = models.DateTimeField(default=None, blank=True, null=True)
    location = models.CharField(max_length=500, default='')
    description = models.CharField(max_length=1000, default='')

    def __str__(self):
        return self.question_text
    
    def started(self):
        return self.start_time != None

    def ended(self):
        return self.end_time != None
        # return time > start and time < end


class User(AbstractUser):
    '''extending User class'''
    email = models.EmailField(max_length=254, unique=True)
    email_verified = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    phone_number =  models.CharField(max_length=35)
    phone_number_verified =  models.BooleanField(default=False)

class Post(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.CASCADE,
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    POST_CHOICES = [
        ('PH', 'Photo'),
        ('VI', 'Video'),
        ('GF', 'Gif')
    ]

    post_type = models.CharField(
        max_length=2,
        choices=POST_CHOICES,
        default='PH',
    )
    url = models.CharField(max_length=100)

class Invite(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.CASCADE,
    )
    invitee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="invitee"
    )
    inviter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="inviter"
    )
