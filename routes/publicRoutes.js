const { Router } = require('express')
const publicController = require('../controllers/publicController')
const { requireAuth, guestUser } = require('../middleware/authMiddleware');
const { allowedUsers } = require('../middleware/authorization');

const router = Router();

router.get('/',  publicController.home);
// router.get('/custom', publicController.custom);
// router.get('/bulk-orders', publicController.bulkOrder);
// router.get('/smoothies',  allowedUsers(['admin','staff']), publicController.smooties);

// router.post('/add-to-cart', publicController.addToCart);
// router.get('/cart', publicController.cart_get);

// router.post('/cart', publicController.cart_post);
// router.post('/cart-remove', publicController.cartRemove_post);

router.get('/about', publicController.about );
router.get('/contact', publicController.contact);
router.get('/blogs', publicController.blogs);
router.get('/blog/:slug', publicController.blog);
router.get('/faqs', publicController.faq);
router.get('/terms', publicController.terms);
router.get('/privacy', publicController.privacy);
router.get('/cookie', publicController.cookie_policy);

router.get('/products', publicController.products);
router.get('/products/:page', publicController.products_page);

router.get('/category/:slug', publicController.categoryProducts);
router.get('/category/:slug/:page', publicController.categoryProducts_page);

router.get('/subcategory/:slug', publicController.subCategoryProducts);
router.get('/subcategory/:slug/:page', publicController.subCategoryProducts_page);
router.get('/product/:slug', publicController.product); //productDetails Page

// router.get('/products', publicController.products_page);

// router.get('/pagination', publicController.pagination);





module.exports = router;

