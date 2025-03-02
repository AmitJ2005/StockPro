from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Watchlist
from .serializers import WatchlistSerializer
import yfinance as yf
import logging
import json
from fuzzywuzzy import process
from django.http import JsonResponse
from django.conf import settings
import os
from django.contrib.auth.models import User
from rest_framework import status

logger = logging.getLogger(__name__)

@api_view(['GET'])
def fetch_stock_data(request, symbol):
    """Fetch basic stock data using Yahoo Finance API."""
    try:
        stock_data = yf.Ticker(symbol)
        info = stock_data.info
        return Response({
            'symbol': symbol,
            'name': info.get('shortName'),
            'last_price': info.get('currentPrice', 0.0),
            'ebidta': info.get('ebitda'),
            'net_income': info.get('netIncomeToCommon'),
        })
    except Exception as e:
        logger.error(f"Error fetching stock data for {symbol}: {e}")
        return Response({'error': 'Failed to fetch stock data'}, status=400)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_watchlist(request):
    """Manage user's watchlist - Add, View, or Remove stocks."""
    user = request.user

    if request.method == 'GET':
        watchlist = Watchlist.objects.filter(user=user)
        return Response(WatchlistSerializer(watchlist, many=True).data)

    stock_symbol = request.data.get('symbol')
    if not stock_symbol:
        return Response({'error': 'Stock symbol is required'}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        watchlist, created = Watchlist.objects.get_or_create(user=user, stock_symbol=stock_symbol)
        return Response({'message': 'Stock added to watchlist' if created else 'Stock already in watchlist'})

    if request.method == 'DELETE':
        Watchlist.objects.filter(user=user, stock_symbol=stock_symbol).delete()
        return Response({'message': 'Stock removed from watchlist'})


# Load stock names and symbols for search functionality
stock_names_path = os.path.join(settings.BASE_DIR, 'api', 'stock_names.json')
with open(stock_names_path, 'r') as f:
    STOCK_DATA = json.load(f)

@api_view(['GET'])
def search_stocks(request):
    """Search for stocks using fuzzy matching."""
    query = request.GET.get('query', '').strip()
    if not query:
        return JsonResponse([], safe=False)

    matches = process.extract(query, STOCK_DATA.keys(), limit=10)
    return JsonResponse([{'name': name, 'symbol': STOCK_DATA[name]} for name, _ in matches], safe=False)


@api_view(['POST'])
def fetch_stock_details(request):
    """Fetch detailed stock information from Yahoo Finance."""
    symbol = request.data.get('symbol')
    if not symbol:
        return Response({'error': 'Symbol is required'}, status=400)

    try:
        stock_data = yf.Ticker(symbol)
        info = stock_data.info
        return Response({
            'symbol': info.get('symbol'),
            'name': info.get('shortName'),
            'last_price': info.get('currentPrice'),
            'ebitda': info.get('ebitda'),
            'net_income': info.get('netIncomeToCommon'),
            'revenue': info.get('totalRevenue'),
            'profit_margin': info.get('profitMargins'),
            'book_value': info.get('bookValue'),
            'debt_to_equity': info.get('debtToEquity'),
            'dividend_rate': info.get('dividendRate'),
            'trailing_pe': info.get('trailingPE'),
            'forward_pe': info.get('forwardPE'),
            'beta': info.get('beta'),
            'employees': info.get('fullTimeEmployees'),
            'sector': info.get('sector'),
            'industry': info.get('industry'),
            'market_cap': info.get('marketCap'),
            'enterprise_value': info.get('enterpriseValue'),
        })
    except Exception as e:
        logger.error(f"Error fetching stock details for {symbol}: {e}")
        return Response({'error': 'Failed to fetch stock details'}, status=400)


@api_view(['POST'])
def register_user(request):
    """Register a new user."""
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, password=password)
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
