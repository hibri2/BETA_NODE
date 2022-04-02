from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


urlpatterns = [
    #ADMIN
    path('', RedirectView.as_view(url='admin/', permanent=False)),
    path('admin/', admin.site.urls),
    #ANA
    path('api/v1/ana/', include('ANA.urls')),
    #API DOCUMENTATION (DRF-SPECTACULAR)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    # SCHEMA SWAGGER UI:
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]