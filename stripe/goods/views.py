from django.conf import settings
from django.shortcuts import redirect, render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
import stripe

from .models import Item
from .serializers import ItemSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY


def index(request):
    return render(request, 'goods/index.html')


class ItemAPIList(generics.ListAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemAPIDetail(generics.RetrieveAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class BuyAPIView(APIView):
    def get(self, request, pk: int):
        item = Item.objects.get(pk=pk)
        session = stripe.checkout.Session.create(
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item.name,
                    },
                    'unit_amount': item.price * 100,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:8000/success',
            cancel_url='http://localhost:8000/cancel',
        )
        return Response({'session_id': session.id, 'STRIPE_PUBLISH_KEY': settings.STRIPE_PUBLISH_KEY})
