
SELECT categories.id, categories.name as 'Category Name', categories.active, 
subCategories.id, subCategories.name as 'Sub Category Name', subCategories.active,
products.id, products.name as 'Product Name', products.slug, products.usage, products.active 
FROM products
left JOIN categories on products.categoryId = categories.Id
left JOIN subCategories ON subCategories.id = products.subCategoryId

Where products.name like '%football%' 
or categories.name like '%football%'
or products.usage like '%match%'
and products.active = 1
-- and categories.active = 1
-- and subCategories.active = 1
;

