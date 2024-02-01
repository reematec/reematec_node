const { Router } = require('express')
const publicController = require('../controllers/publicController')
const { requireAuth, guestUser } = require('../middleware/authMiddleware');
const { allowedUsers } = require('../middleware/authorization');

const router = Router();

router.get('/',  publicController.home);
router.get('/about', publicController.about );
router.get('/contact', publicController.contact);
router.post('/contact', publicController.contact_post);
router.post('/rfq', publicController.rfq_post);
router.get('/blogs', publicController.blogs);
router.get('/blog/:slug', publicController.blog);
router.get('/faqs', publicController.faq);
router.get('/quotes', publicController.quotes);
router.get('/terms', publicController.terms);
router.get('/privacy', publicController.privacy);
router.get('/cookie-policy', publicController.cookie_policy);
router.get('/restricted', publicController.access_restricted);
router.get('/search', publicController.search);

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

