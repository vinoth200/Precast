# Generated by Django 4.2.5 on 2023-10-04 07:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='precast',
            name='created_at',
        ),
    ]
