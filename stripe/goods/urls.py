from django.urls import path

from .views import ItemAPIList, ItemAPIDetail, BuyAPIView, index


urlpatterns = [
    path('', index, name='index'),
    path('items/', ItemAPIList.as_view(), name='items'),
    path('items/<int:pk>/', ItemAPIDetail.as_view(), name='item'),
    path('buy/<int:pk>/', BuyAPIView.as_view(), name='buy_item'),
]
