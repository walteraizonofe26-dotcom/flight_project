#from django.http import HttpResponse
from django.shortcuts import render

def homepage(request):
    #return HttpResponse("hello worl! i am home")
    return render(request, 'home.html')

def about(request):
   # return HttpResponse("my about page.")
   return render(request, 'about.html')

def base(request):
   # return HttpResponse("my about page.")
   return render(request, 'base.html')

def book_flight(request):
   # return HttpResponse("my about page.")
   return render(request, 'book_flight.html')

def booking_review(request):
   # return HttpResponse("my about page.")
   return render(request, 'booking_review.html')

def confirmation(request):
   # return HttpResponse("my about page.")
   return render(request, 'confirmation.html')

def contact(request):
   # return HttpResponse("my about page.")
   return render(request, 'contact.html')

def flight_results(request):
   # return HttpResponse("my about page.")
   return render(request, 'flight_results.html')

def payment(request):
   # return HttpResponse("my about page.")
   return render(request, 'payment.html')


def book_car(request):
   # return HttpResponse("my about page.")
   return render(request, 'book_car.html')


def book_hotel(request):
   # return HttpResponse("my about page.")
   return render(request, 'book_hotel.html')


def pay_small_small(request):
   # return HttpResponse("my about page.")
   return render(request, 'pay_small_small.html')


def select_seat(request):
   # return HttpResponse("my about page.")
   return render(request, 'select_seat.html')

def travel(request):
   # return HttpResponse("my about page.")
   return render(request, 'travel.html')


    
    
    
    
    
    
    
