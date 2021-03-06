# Generated by Django 3.1.7 on 2021-07-27 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fiesta_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dessert',
            name='last_open_table_update',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dessert',
            name='open_table_id',
            field=models.CharField(default='-1', max_length=15),
        ),
        migrations.AddField(
            model_name='drinks',
            name='last_open_table_update',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='drinks',
            name='open_table_id',
            field=models.CharField(default='-1', max_length=15),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='last_open_table_update',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='restaurant',
            name='open_table_id',
            field=models.CharField(default='-1', max_length=15),
        ),
        migrations.AlterField(
            model_name='location',
            name='country',
            field=models.CharField(default='US', max_length=50),
        ),
    ]
