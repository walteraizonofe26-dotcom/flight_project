from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def homepage(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def book_flight(request):
    return render(request, 'book_flight.html')

def booking_review(request):
    return render(request, 'booking_review.html')

def contact(request):
    return render(request, 'contact.html')

def flight_results(request):
    return render(request, 'flight_results.html')

def payment(request):
    return render(request, 'payment.html')

def confirmation(request):
    return render(request, 'confirmation.html')

def book_hotel(request):
    return render(request, 'book_hotel.html')

def book_car(request):
    return render(request, 'book_car.html')

def travel(request):
    return render(request, 'travel.html')

def select_seat(request):
    return render(request, 'select_seat.html')

def pay_small_small(request):
    return render(request, 'pay_small_small.html')

def base(request):
    return render(request, 'base.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}! You can now log in.')
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Redirect to home after login
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'user_login.html')

def user_logout(request):
    logout(request)
    return redirect('home')  # Redirect to home after logout