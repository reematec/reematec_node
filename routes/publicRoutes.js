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
router.get('/products', publicController.products);
router.get('/category/<slug:slug>', publicController.categoryProducts);
router.get('/subcategory/<slug:slug>', publicController.subCategoryProducts);

router.get('/product/<slug:slug>', publicController.product);
router.get('/blogs', publicController.blog);
router.get('/faqs', publicController.faq);
router.get('/terms', publicController.terms);
router.get('/privacy', publicController.privacy);
router.get('/cookie', publicController.cookie_policy);
// router.get('/pagination', publicController.pagination);





module.exports = router;

