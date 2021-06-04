from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import User, Event, Invite, Post

admin.site.register(User, UserAdmin)
admin.site.register(Event)
admin.site.register(Invite)
admin.site.register(Post)

