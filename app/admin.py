from django.contrib import admin
from .models import *
from import_export.admin import ImportExportModelAdmin

# Register your models here.



@admin.register(Precast,Project)

class PrecastAdmin(ImportExportModelAdmin):
    def save_model(self, request, obj, form, change):
        # Check if project_name is provided
        if obj.project:
            try:
                # Attempt to retrieve the project by name
                project = Project.objects.get(project_name=obj.project)
                obj.project = project  # Assign the project to the Precast object
            except Project.DoesNotExist:
                pass

        # Check if precast_number is provided
        if obj.precast_number:
            try:
                # Attempt to retrieve an existing Precast object with the same precast_number
                existing_precast = Precast.objects.get(precast_number=obj.precast_number)

                # Update the existing Precast object's attributes
                existing_precast.project = obj.project
                existing_precast.other_field = obj.other_field  # Update other fields as needed
                existing_precast.save()  # Save the changes

                # Set obj to the existing Precast object to prevent creation of a new one
                obj = existing_precast
            except Precast.DoesNotExist:
                pass

        # Call the original save_model method to save the object
        super().save_model(request, obj, form, change)

       
