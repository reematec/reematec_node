from django import template
from django.urls import path

from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('products/', views.products, name='products'),
    # path('products/<slug:slug>/', views.products, name='products'),
    path('category/<slug:slug>/', views.categoryProducts, name='category-products'),
    path('subcategory/<slug:slug>/', views.subCategoryProducts, name='subCategory-products'),

    path('product/<slug:slug>/', views.product, name='product'),
    path('blogs/', views.blog, name='blogs'),
    path('faqs/', views.faq, name='faqs'),
    path('terms/', views.terms, name='terms'),
    path('privacy/', views.privacy, name='privacy'),
    path('cookie/', views.cookie_policy, name='cookie'),
    path('pagination/', views.pagination, name='pagination'),
    
    path('dashboard/', views.dashboard, name='dashboard'),

    path('home/category/', views.category, name='category-panel'),
    path('home/add-category/', views.addCategory, name='add-category'),
    path('home/update-category/<str:pk>/', views.updateCategory, name='update-category'),
    path('home/delete-category/<str:pk>/', views.deleteCategory, name='delete-category'),
    
    path('home/subcategory/', views.subcategory, name='subcategory-panel'),
    path('home/add-subcategory/', views.addSubcategory, name='add-subcategory'),
    path('home/update-subcategory/<str:pk>/', views.updateSubcategory, name='update-subcategory'),
    path('home/delete-subcategory/<str:pk>/', views.deleteSubcategory,name='delete-subcategory'),
    
    path('home/images/', views.gallery, name='images'),
    path('home/update-images/<str:pk>/', views.updateImage, name='update-image'),
    path('home/delete-images/<str:pk>/', views.deleteImage, name='delete-image'),
    
    path('home/product/', views.productPosting, name='product-panel'),
    path('home/add-product/', views.addProduct, name='add-product'),
    path('home/update-product/<str:pk>/', views.updateProduct, name='update-product'),
    path('home/delete-product/<str:pk>/', views.deleteProduct, name='delete-product'),
    
    path('home/tags/', views.tagPosting, name='tag-panel'),
    path('home/add-tag/', views.addTag, name='add-tag'),
    path('home/update-tag/<str:identifier>/', views.updateTag, name='update-tag'),
    path('home/delete-tag/<str:identifier>/', views.deleteTag, name='delete-tag'),
    
    path('home/sizes/', views.sizes, name='size-panel'),
    path('home/add-size/', views.addSize, name='add-size'),
    path('home/update-size/<str:identifier>/', views.updateSize, name='update-size'),
    path('home/delete-size/<str:identifier>/', views.deleteSize, name='delete-size'),
    
    path('home/add-product/getsubcategories/<str:pk>/', views.getSubcatgories, name='get-subcategories'),
    # path('home/add-product/getsubcategories/<str:pk>/', views.getSubcatgories, name='get-subcategories'),
    path('home/update-product/<str:page>/getsubcategories/<str:pk>/', views.getSubcatgoriesUpdate, name='get-subcategories'),
    path('home/add-product/getimages/', views.getimages ),
    path('home/add-product/imagesAjax/', views.imagesAjax ),
    path('home/update-product/<str:pk>/imagesAjax/', views.imagesAjaxUpdate ),
    #     home/update-product/9/imagesAjax/?page=1
    
    # path('home/reset_password_email/', views.email_verification, name='email-verification'),


    # path('reset_password/', auth_views.PasswordResetView.as_view()),
    
]