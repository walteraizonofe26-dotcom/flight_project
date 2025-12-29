"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.homepage, name='home'),
    path('about/', views.about, name='about'),
     path('base/', views.base, name='base'),
      path('book-flight/', views.book_flight, name='book_flight'),
       path('book-review/', views.booking_review, name='booking_review'),
        path('contact/', views.contact, name='contact'),
         path('flight-results/', views.flight_result, name='flight_results'),
          path('payment/', views.payment, name='payment'),
           path('confirmation/', views.confirmation, name='confirmation'),
            path('book_hotel/', views.book_hotel, name='book_hotel'),
             path('book_car/', views.book_car, name='book_car'),
              path('travel/', views.travel, name='travel'),
               path('select_seat/', views.select_seat, name='select_seat'),
                path('pay_small_small/', views.pay_small_small, name='pay_small_small'),
]
