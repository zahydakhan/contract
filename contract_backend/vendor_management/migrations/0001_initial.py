# Generated by Django 3.1.5 on 2021-01-19 06:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VendorBasic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vendor_number', models.CharField(max_length=255)),
                ('abn', models.CharField(max_length=255)),
                ('supplier_name', models.CharField(max_length=255)),
                ('contact_name', models.CharField(max_length=255)),
                ('contact_email', models.EmailField(max_length=254)),
                ('telephone', models.CharField(blank=True, max_length=255, null=True)),
                ('mobile', models.CharField(max_length=255)),
                ('address_line', models.TextField()),
                ('address_suburb', models.CharField(max_length=255)),
                ('address_state', models.CharField(max_length=255)),
                ('address_postcode', models.CharField(max_length=255)),
                ('company_email', models.EmailField(max_length=254)),
                ('website', models.CharField(blank=True, max_length=255, null=True)),
                ('comments', models.TextField(blank=True, null=True)),
                ('supplier_revenue_annual', models.DecimalField(decimal_places=2, max_digits=20)),
                ('buyer_annual_spend_apprx', models.DecimalField(decimal_places=2, max_digits=20)),
                ('company_size', models.DecimalField(decimal_places=2, max_digits=10)),
                ('active', models.BooleanField(blank=True, default=False, null=True)),
                ('created_date', models.DateField(default=django.utils.timezone.now)),
                ('modified_date', models.DateField(blank=True, null=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Vendorcreator_rev', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modifier_rev', to=settings.AUTH_USER_MODEL)),
                ('primary_buyer_contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='buyer_rev', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
