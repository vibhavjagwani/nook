from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelAdmin, PolymorphicChildModelFilter

# Register your models here.
from .models import User, GenericActivity, Restaurant, Drinks, Dessert, Location, Activity

admin.site.register(User, UserAdmin)
class GenericActivityChildAdmin(PolymorphicChildModelAdmin):
    base_model = GenericActivity

@admin.register(Restaurant)
class RestaurantAdmin(GenericActivityChildAdmin):
    base_model = Restaurant 

@admin.register(Drinks)
class DrinksAdmin(GenericActivityChildAdmin):
    base_model = Drinks

@admin.register(Dessert)
class DessertAdmin(GenericActivityChildAdmin):
    base_model = Dessert

@admin.register(Activity)
class ActivityAdmin(GenericActivityChildAdmin):
    base_model = Activity

@admin.register(GenericActivity)
class GenericActivityParentAdmin(PolymorphicParentModelAdmin):
    """ The parent model admin """
    base_model = GenericActivity  # Optional, explicitly set here.
    child_models = (Restaurant, Drinks, Dessert)
    # list_filter = (PolymorphicChildModelFilter,)  # This is optional.

admin.site.register(Location)