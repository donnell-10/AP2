from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, dob, password = None, **other_fields):
        if not email:
            raise ValueError("Users must have an email address")
        
        email = self.normalize_email(email)
        user = self.model(email = email , name = name, dob= dob, password = None, **other_fields)
        user.set_password(password)
        user.save()

        return user


    def create_superuser(self, email, name, dob, password=None, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        
        return self.create_user(email=email, name=name, dob=dob, password=password, **other_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    dob = models.DateField(null=True)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = True)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'dob']

    def __str__(self):
        return self.name + " || " + self.email + " || " + str(self.dob)
