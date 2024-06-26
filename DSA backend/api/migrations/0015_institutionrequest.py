# Generated by Django 4.1.4 on 2024-06-24 18:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_task_progress_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='InstitutionRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_type', models.CharField(blank=True, choices=[('user_type', 'User Type'), ('department_type', 'Department Type')], max_length=250, null=True)),
                ('department_name', models.CharField(blank=True, max_length=500, null=True)),
                ('color', models.CharField(blank=True, choices=[('red', 'Red'), ('yellow', 'Yellow'), ('blue', 'Blue'), ('orange', 'Orange'), ('indigo', 'Indigo'), ('green', 'Green'), ('purple', 'Purple')], max_length=250, null=True)),
                ('password', models.CharField(blank=True, max_length=1000, null=True)),
                ('is_approved', models.BooleanField(blank=True, default=False, null=True)),
                ('institution', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.institution')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
