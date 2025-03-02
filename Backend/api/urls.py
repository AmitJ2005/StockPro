from django.urls import path
from .views import fetch_stock_data, manage_watchlist, search_stocks, fetch_stock_details, register_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('stock/<str:symbol>/', fetch_stock_data, name='fetch_stock_data'),
    path('watchlist/', manage_watchlist, name='manage_watchlist'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('search/', search_stocks, name='search_stocks'),
    path('stock-details/', fetch_stock_details, name='fetch_stock_details'),
    path('register/', register_user, name='register_user'),
]