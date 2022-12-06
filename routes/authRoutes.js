const { Router } = require('express')
const authController = require('../controllers/authController')
const { requireAuth, guestUser } = require('../middleware/authMiddleware');
const passport = require('passport')
const {check, param, body } = require('express-validator');
const { slugValidator } = require('../validators/commonValidators');
const { addValidator, editValidator } = require('../validators/categoryValidators');
const { addSubValidator, editSubValidator } = require('../validators/subcategoryValidators');
const { addTagValidator, editTagValidator } = require('../validators/tagValidators');
const router = Router();

// router.get('/signup', guestUser, authController.signup_get);
// router.post('/signup' ,authController.signup_post);
// router.get('/login', guestUser, authController.login_get);

// router.post('/login', passport.authenticate('local', {
//     // successRedirect: '/account',
//     failureRedirect: '/login', 
//     // failureFlash:true
// }),  authController.login_post);

// router.get('/logout', authController.logout_get);

// router.get('/account', requireAuth, authController.account_get);

// router.get('/password-reset', guestUser, authController.password_forgot_get);
// router.get('/password-reset-done', guestUser, authController.password_forgot_done_get);


// router.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile']}) )
// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
//     (req, res)=>{
//         res.redirect('/account')
//     }
// )

// router.get('/auth/instagram', passport.authenticate('instagram'));
// // app.get('/auth/instagram', passport.authenticate('instagram', {scope:['user_profile','user_media']}));

// router.get('/auth/instagram/callback',  passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/account');
//   });

// router.get('/logout', (req, res)=>{
//     req.logOut()
//     res.redirect('/')
// })


router.get('/dashboard', authController.dashboard);

//#region Category
router.get('/home/category', authController.category);
router.get('/home/add-category', authController.addCategory_get);

router.post('/home/add-category', addValidator,  authController.addCategory_post);
router.get('/home/update-category/:slug', slugValidator, authController.updateCategory_get);

router.post('/home/update-category', editValidator, authController.updateCategory_post);
router.get('/home/delete-category/:slug',slugValidator, authController.deleteCategory_get);
router.post('/home/delete-category', authController.deleteCategory_post);
//#endregion

//#region Subcategory
router.get('/home/subcategory', authController.subcategory);
router.get('/home/add-subcategory', authController.addSubcategory_get);
router.post('/home/add-subcategory',addSubValidator, authController.addSubcategory_post);
router.get('/home/update-subcategory/:slug', slugValidator, authController.updateSubcategory_get);
router.post('/home/update-subcategory/:slug', slugValidator, editSubValidator, authController.updateSubcategory_post);
router.get('/home/delete-subcategory/:slug', slugValidator, authController.deleteSubcategory_get);
router.post('/home/delete-subcategory/:slug', slugValidator, authController.deleteSubcategory_post);
//#endregion

//#region Image
router.get('/home/images', authController.gallery_get);
router.get('/home/images/add', authController.addImages_get);
router.post('/home/images/add', authController.addImages_post);
router.get('/home/update-image/:identifier', authController.updateImage_get);
router.post('/home/update-image/:identifier', authController.updateImage_post);
router.get('/home/delete-image/:identifier', authController.deleteImage_get);
router.post('/home/delete-image/:identifier', authController.deleteImage_post);
//#endregion

//#region Tags
router.get('/home/tags', authController.tags);
router.get('/home/add-tag', authController.addTag_get);
router.post('/home/add-tag', addTagValidator, authController.addTag_post);
router.get('/home/update-tag/:slug', slugValidator, authController.updateTag_get);
router.post('/home/update-tag/:slug', slugValidator, editTagValidator, authController.updateTag_post);
router.get('/home/delete-tag/:slug', slugValidator, authController.deleteTag_get);
router.post('/home/delete-tag/:slug', slugValidator, authController.deleteTag_post);
//#endregion

//#region Sizes
router.get('/home/sizes', authController.sizes);
router.get('/home/add-size', authController.addSize_get);
router.post('/home/add-size', authController.addSize_post);
router.get('/home/update-size/:identifier', authController.updateSize_get);
router.post('/home/update-size/:identifier', authController.updateSize_post);
router.get('/home/delete-size/:identifier', authController.deleteSize_get);
router.post('/home/delete-size/:identifier', authController.deleteSize_post);
//#endregion

//#region Product
router.get('/home/product', authController.productPosting);
router.get('/home/add-product', authController.addProduct_get);
router.post('/home/add-product', authController.addProduct_post);
router.get('/home/view-product/:slug', authController.viewProduct_get);
router.get('/home/update-product/:slug', authController.updateProduct_get);
router.post('/home/update-product/:slug', authController.updateProduct_post);
router.get('/home/delete-product/:slug', authController.deleteProduct_get);
router.post('/home/delete-product/:slug', authController.deleteProduct_post);
//#endregion

router.get('/home/add-product/getsubcategories/:id', authController.getSubcatgories);
router.get('/home/update-product/getsubcategories/:id', authController.getSubcatgories);

// router.get('/home/update-product/<str:page>/getsubcategories/:slug', authController.getSubcatgoriesUpdate);
// router.get('/home/add-product/getimages', authController.getimages );
router.get('/home/imagesAjax', authController.imagesAjax );
// router.get('/home/update-product/:slug/imagesAjax', authController.imagesAjaxUpdate );

module.exports = router;