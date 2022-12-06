import os
import uuid
from django.db import models
from PIL import Image as PILImage


from tinymce.models import HTMLField
from tinymce.widgets import TinyMCE


# Create your models here.

class Category(models.Model):    
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(null=False, unique=True)    
    pagetitle = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    active = models.BooleanField(default=True)
    showSubMenu = models.BooleanField(default=True)
    date_created = models.TimeField(verbose_name='Date Created', auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Last Updated', auto_now=True)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200)
    slug = models.SlugField(null=False, unique=True)    
    pagetitle = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    active = models.BooleanField(default=True)        
    date_created = models.TimeField(verbose_name='Date Created', auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Last Updated', auto_now=True)
    
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Sub Categories"        


class Image(models.Model):
    # identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    image = models.ImageField(upload_to='uploads', null=False)
    alternativeText = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    caption = models.CharField(max_length=200, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)

    def deleteImage(self):        
        if 'static/images/' + str(self.image):
            os.remove('static/images/' + str(self.image))
    
    
    def deleteThumb(self):        
        if 'static/images/thumbnails/' + self.imageName():
            os.remove('static/images/thumbnails/' + self.imageName())
    
    
    def createThumbnail(self):        
        thumb_folder = 'static/images/thumbnails/'
        if not os.path.exists(thumb_folder):
            os.mkdir(thumb_folder)                        
                    
        basewidth = 300
        img = PILImage.open('static'+ self.image.url)
        wpercent = (basewidth/float(img.size[0]))            
        hsize = int((float(img.size[1])*float(wpercent)))
        img = img.resize((basewidth,hsize), PILImage.ANTIALIAS)
        img.save('static/images/thumbnails/' + self.imageName(), quality=90)


    def update(self, *args, **kwargs):
        try:
            this = Image.objects.get(id=self.id)
            
            if this.image != self.image:
                this.image.delete()
        except: pass
        super(Image, self).save(*args, **kwargs)

    def removeOldImages(self, oldImage):
        if oldImage != self.imageName():
            if 'static/images/uploads/' + oldImage:
                os.remove('static/images/uploads/' + oldImage)
                
            
            if 'static/images/thumbnails/' + oldImage:               
                os.remove('static/images/thumbnails/' + oldImage)
               
    def imageName(self):
        img = str(self.image)
        lastIndex = img.rfind('/')
        length = len(img)        
        return img[lastIndex + 1 : length]

    def __str__(self):       
            return self.imageName()

    class Meta:
        verbose_name_plural = "Images"


class Tag(models.Model):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)    
    name = models.CharField(max_length=200, unique=True, null=False, blank=False)
    slug = models.SlugField(null=False, unique=True)    
    active = models.BooleanField(default=True)    
    date_created = models.TimeField(verbose_name='Date Created', auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Last Updated', auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Tags"


class Size(models.Model):    
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)    
    size = models.CharField(max_length=200, unique=True, null=False, blank=False)
    active = models.BooleanField(default=True)    
    date_created = models.TimeField(verbose_name='Date Created', auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Last Updated', auto_now=True)

    def __str__(self):
        return self.size        

    class Meta:
        verbose_name_plural = "Sizes"


class Product(models.Model):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    slug = models.SlugField(max_length=30, unique=True)
    showcased = models.BooleanField(default=False)
    recommended = models.BooleanField(default=False)
    active = models.BooleanField(default=True)    
    price = models.DecimalField(max_digits = 5, decimal_places = 2, null=True, blank=True)
    pagetitle = models.CharField(max_length=200, null=True, blank=True)
    shortDescription = models.CharField(max_length=200, null=True, blank=True)    
    longDescription = HTMLField(null=True, blank=True)
    specifications = models.TextField(null=True, blank=True)
    features = models.TextField(null=True, blank=True)
    care = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    subCategory = models.ForeignKey(SubCategory,  null=True, blank=True, on_delete=models.PROTECT)
    image = models.ManyToManyField(Image, blank=True)
    size = models.ManyToManyField(Size, blank=True)
    tag = models.ManyToManyField(Tag, blank=True)
    date_created = models.TimeField(verbose_name='Date Created', auto_now_add=True)
    date_updated = models.DateTimeField(verbose_name='Last Updated', auto_now=True)
    
    def __str__(self):
        return self.name
        
    
    class Meta:
        verbose_name_plural = "Products"


class ProductAttribute(models.Model):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    name = models.CharField(max_length=200, null=True, blank=True)
    detail = models.TextField(null=True, blank=True)    

    def __str__(self):
        return self.name        

    class Meta:
        verbose_name_plural = "Products Attributes"


#(one to one) models.OneToOneField(Place,on_delete=models.CASCADE,primary_key=True,)
# (manytoone) models.ForeignKey(Reporter, on_delete=models.CASCADE)
#(manytomany) models.ManyToManyField(Publication)        

# from PIL import Image


# def __str__(self):
#     return self.title


# def save(self, *args, **kwargs):
#     super(Posts, self).save(*args, **kwargs)
#     imag = Image.open(self.post_image.path)
#     if imag.width > 400 or imag.height> 300:
#         output_size = (400, 300)
#         imag.thumbnail(output_size)
#         imag.save(self.post_image.path)
# class Meta:
#     verbose_name_plural = "Posts"


# def save(self, *args, **kwargs):
#         if self.photo:
#             image = Img.open(StringIO.StringIO(self.photo.read()))
#             image.thumbnail((200,200), Img.ANTIALIAS)
#             output = StringIO.StringIO()
#             image.save(output, format='JPEG', quality=75)
#             output.seek(0)
#             self.photo= InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.photo.name, 'image/jpeg', output.len, None)
#         super(Mymodel, self).save(*args, **kwargs)

# import uuid
# from PIL import Image
# from io import BytesIO
# from django.core.files import File
# from django.core.files.base import ContentFile
# from django.db import models
# class ResizeImageMixin:
#     def resize(self, imageField: models.ImageField, size:tuple):
#         im = Image.open(imageField)  # Catch original
#         source_image = im.convert('RGB')
#         source_image.thumbnail(size)  # Resize to size
#         output = BytesIO()
#         source_image.save(output, format='JPEG') # Save resize image to bytes
#         output.seek(0)

#         content_file = ContentFile(output.read())  # Read output and create ContentFile in memory
#         file = File(content_file)

#         random_name = f'{uuid.uuid4()}.jpeg'
#         imageField.save(random_name, file, save=False)

# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     image = models.ImageField(default='default.jpg', upload_to='profile_pics')

#     def __str__(self):
#         return f'{self.user.username} Profile'

#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
#         img = Image.open(self.image.path)
#         output_size = (125, 125)
#         img.thumbnail(output_size)
#         img.save(self.image.path)