
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


SELECT count(DISTINCT(`product`.`id`)) AS `count` FROM `products` AS `product` 
LEFT OUTER JOIN ( `Product_Image` AS `images->Product_Image` 
INNER JOIN `images` AS `images` ON `images`.`id` = `images->Product_Image`.`imageId`) ON `product`.`id` = `images->Product_Image`.`productId` 
LEFT OUTER JOIN `categories` AS `category` ON `product`.`categoryId` = `category`.`id` 
LEFT OUTER JOIN `subCategories` AS `subCategory` ON `product`.`subCategoryId` = `subCategory`.`id` 
WHERE (`product`.`name` LIKE '%balls%' OR `product`.`usage` LIKE '%balls%' OR `subCategory`.`name` LIKE '%balls%' OR `category`.`name` LIKE '%balls%');

SELECT `product`.`id`, `product`.`identifier`, `product`.`name`, `product`.`usage`, `product`.`slug`, `product`.`active`, `images`.`id` AS `images.id`, `images`.`src` AS `images.src`, `images`.`altText` AS `images.altText`, `images->Product_Image`.`createdAt` AS `images.Product_Image.createdAt`, `images->Product_Image`.`updatedAt` AS `images.Product_Image.updatedAt`, `images->Product_Image`.`imageId` AS `images.Product_Image.imageId`, 
`images->Product_Image`.`productId` AS `images.Product_Image.productId`, `category`.`id` AS 
`category.id`, `category`.`name` AS `category.name`, `subCategory`.`id` AS `subCategory.id`, `subCategory`.`name` AS `subCategory.name` FROM `products` AS `product` LEFT OUTER JOIN ( `Product_Image` AS `images->Product_Image` INNER JOIN `images` AS `images` ON `images`.`id` = `images->Product_Image`.`imageId`) ON `product`.`id` = `images->Product_Image`.`productId` 
LEFT OUTER JOIN `categories` AS `category` ON `product`.`categoryId` = `category`.`id` LEFT 
OUTER JOIN `subCategories` AS `subCategory` ON `product`.`subCategoryId` = `subCategory`.`id` WHERE (`product`.`name` LIKE '%balls%' OR `product`.`usage` LIKE '%balls%' OR `subCategory`.`name` LIKE '%balls%' OR `category`.`name` LIKE '%balls%') ORDER BY `product`.`id` DESC;


Executing (default): SELECT count(DISTINCT(`product`.`id`)) AS `count` 
FROM `products` AS `product` 
LEFT OUTER JOIN ( `Product_Image` AS `images->Product_Image` 
INNER JOIN `images` AS `images` ON `images`.`id` = `images->Product_Image`.`imageId`) ON `product`.`id` = `images->Product_Image`.`productId` 
LEFT OUTER JOIN `categories` AS `category` ON `product`.`categoryId` = `category`.`id` 
INNER JOIN `subCategories` AS `subCategory` ON `product`.`subCategoryId` = `subCategory`.`id` AND `subCategory`.`active` = true 

WHERE (`product`.`name` LIKE '%test%' OR `product`.`usage` LIKE '%test%');



Executing (default): SELECT `product`.*, `images`.`id` AS `images.id`, `images`.`identifier` AS `images.identifier`, `images`.`src` AS `images.src`, `images`.`altText` AS `images.altText`, `images`.`title` AS `images.title`, `images`.`description` AS `images.description`, `images`.`caption` AS `images.caption`, `images`.`createdAt` AS `images.createdAt`, `images`.`updatedAt` AS `images.updatedAt`, `images->Product_Image`.`createdAt` AS `images.Product_Image.createdAt`, `images->Product_Image`.`updatedAt` AS `images.Product_Image.updatedAt`, `images->Product_Image`.`imageId` AS `images.Product_Image.imageId`, `images->Product_Image`.`productId` AS `images.Product_Image.productId`, `category`.`id` AS `category.id`, `category`.`identifier` AS `category.identifier`, `category`.`name` AS `category.name`, `category`.`slug` AS `category.slug`, `category`.`pagetitle` AS `category.pagetitle`, `category`.`description` AS `category.description`, `category`.`active` AS `category.active`, `category`.`showSubMenu` AS `category.showSubMenu`, `category`.`createdAt` AS `category.createdAt`, `category`.`updatedAt` AS `category.updatedAt` FROM (SELECT `product`.`id`, `product`.`identifier`, `product`.`name`, `product`.`usage`, `product`.`slug`, `product`.`active`, `product`.`categoryId`, `subCategory`.`id` AS `subCategory.id`, `subCategory`.`identifier` AS `subCategory.identifier`, `subCategory`.`name` AS `subCategory.name`, `subCategory`.`slug` AS `subCategory.slug`, `subCategory`.`pagetitle` AS `subCategory.pagetitle`, `subCategory`.`description` AS `subCategory.description`, `subCategory`.`active` AS `subCategory.active`, `subCategory`.`categoryId` AS `subCategory.categoryId`, `subCategory`.`createdAt` AS `subCategory.createdAt`, `subCategory`.`updatedAt` AS `subCategory.updatedAt` FROM `products` AS `product` INNER JOIN `subCategories` AS `subCategory` ON `product`.`subCategoryId` = `subCategory`.`id` AND `subCategory`.`active` = true WHERE (`product`.`name` LIKE '%test%' OR `product`.`usage` LIKE '%test%') ORDER BY `product`.`id` DESC LIMIT 0, 7) AS `product` LEFT OUTER JOIN ( 
`Product_Image` AS `images->Product_Image` INNER JOIN `images` AS `images` ON `images`.`id` = `images->Product_Image`.`imageId`) ON `product`.`id` = `images->Product_Image`.`productId` LEFT OUTER JOIN `categories` AS `category` ON `product`.`categoryId` = `category`.`id` ORDER BY `product`.`id` DESC;
