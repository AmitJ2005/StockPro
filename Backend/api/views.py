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
    try:
        logger.debug(f"Fetching stock data for symbol: {symbol}")
        stock_data = yf.Ticker(symbol)
        info = stock_data.info
        logger.debug(f"Stock info: {info}")
        data = {
            'symbol': symbol,
            'name': info.get('shortName'),
            'last_price': info.get('currentPrice', 0.0),  # Set default to 0.0
            'ebidta': info.get('ebitda'),
            'net_income': info.get('netIncomeToCommon'),
        }
        return Response(data)
    except Exception as e:
        logger.error(f"Error fetching stock data for {symbol}: {e}", exc_info=True)
        return Response({'error': str(e)}, status=400)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_watchlist(request):
    user = request.user
    if request.method == 'GET':
        watchlist = Watchlist.objects.filter(user=user)
        serializer = WatchlistSerializer(watchlist, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        stock_symbol = request.data.get('symbol')
        watchlist, created = Watchlist.objects.get_or_create(user=user, stock_symbol=stock_symbol)
        if created:
            return Response({'message': 'Stock added to watchlist'})
        return Response({'message': 'Stock already in watchlist'})

    if request.method == 'DELETE':
        stock_symbol = request.data.get('symbol')
        Watchlist.objects.filter(user=user, stock_symbol=stock_symbol).delete()
        return Response({'message': 'Stock removed from watchlist'})

# Load stock names and symbols
stock_names_path = os.path.join(settings.BASE_DIR, 'api', 'stock_names.json')
with open(stock_names_path, 'r') as f:
    STOCK_DATA = json.load(f)

@api_view(['GET'])
def search_stocks(request):
    query = request.GET.get('query', '').strip()
    if not query:
        return JsonResponse([], safe=False)

    # Perform fuzzy matching
    matches = process.extract(query, STOCK_DATA.keys(), limit=10)
    results = [{'name': name, 'symbol': STOCK_DATA[name]} for name, _ in matches]

    return JsonResponse(results, safe=False)

@api_view(['POST'])
def fetch_stock_details(request):
    symbol = request.data.get('symbol')
    if not symbol:
        return Response({'error': 'Symbol is required'}, status=400)

    try:
        stock_data = yf.Ticker(symbol)
        info = stock_data.info
        data = {
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
        }
        return Response(data)
    except Exception as e:
        logger.error(f"Error fetching stock details for {symbol}: {e}", exc_info=True)
        return Response({'error': str(e)}, status=400)
    

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)