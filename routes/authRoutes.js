const { Router } = require('express')
const authController = require('../controllers/authController')
const { requireAuth, guestUser, onlyAdmin, isAccountActive } = require('../middleware/authMiddleware');
const passport = require('passport')
const {check, param, body } = require('express-validator');
const { slugValidator } = require('../validators/commonValidators');
const { addValidator, editValidator } = require('../validators/categoryValidators');
const { addSubValidator, editSubValidator } = require('../validators/subcategoryValidators');
const { addTagValidator, editTagValidator } = require('../validators/tagValidators');
const { addProductVal, editProductVal } = require('../validators/productValidators');
const {singupValidator} = require('../validators/UserValidators');
const { editImageDetails } = require('../validators/imageValidators');
const router = Router();

router.get('/dashboard', requireAuth, isAccountActive, authController.dashboard);

//#region Authentication
router.get('/signup', guestUser, authController.signup_get);
router.post('/signup', guestUser, singupValidator,  authController.signup_post);

router.get('/login', guestUser, authController.login_get);
router.post('/login',  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login', 
    failureFlash: true,
    badRequestMessage: ' '
}));

router.get('/logout', requireAuth, authController.logout_get);


router.get('/password-reset', guestUser, authController.password_forgot_get);
router.post('/password-reset', guestUser, authController.password_forgot_post);

router.get('/password-reset/:id/:token', guestUser, authController.password_reset_form);
router.post('/password-reset/:id/:token', guestUser, authController.password_reset_confirm_post);
router.get('/password-reset-done', guestUser, authController.password_forgot_done_get);

// router.get('/user/verify/:id/:token', ensureGuest, authController.email_verification);
// router.get('/resend-verification-token/:id', ensureGuest, authController.resend_verification_token_get);
// router.post('/resend-verification-token', authController.resend_verification_token_post);


// router.get('/auth/google', passport.authenticate('google', { scope: ['openid', 'email', 'profile']}) )
// router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
//     (req, res)=>{
//         res.redirect('/dashboard')
//     }
// )

// router.get('/auth/instagram', passport.authenticate('instagram'));
// // app.get('/auth/instagram', passport.authenticate('instagram', {scope:['user_profile','user_media']}));

// router.get('/auth/instagram/callback',  passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/dashboard');
//   });

// router.get('/logout', (req, res)=>{
//     req.logOut()
//     res.redirect('/')
// })

//#endregion

//#region Category
router.get('/home/category', requireAuth, isAccountActive, authController.category);

router.get('/home/add-category',requireAuth, isAccountActive, authController.addCategory_get);
router.post('/home/add-category',requireAuth, isAccountActive, addValidator,  authController.addCategory_post);

router.get('/home/update-category/:slug',requireAuth, isAccountActive, slugValidator, authController.updateCategory_get);
router.post('/home/update-category',requireAuth, isAccountActive, editValidator, authController.updateCategory_post);

router.get('/home/delete-category/:slug',requireAuth, isAccountActive, slugValidator, authController.deleteCategory_get);
router.post('/home/delete-category',requireAuth, isAccountActive, authController.deleteCategory_post);

router.post('/home/category-status/:slug', requireAuth, isAccountActive, slugValidator, authController.categoryStatus_post);
router.post('/home/category-display/:slug', requireAuth, isAccountActive, slugValidator, authController.categoryDisplay_post);

//#endregion

//#region Subcategory
router.get('/home/subcategory',requireAuth, isAccountActive,  authController.subcategory);
router.get('/home/add-subcategory', requireAuth, isAccountActive, authController.addSubcategory_get);
router.post('/home/add-subcategory',requireAuth, isAccountActive, addSubValidator, authController.addSubcategory_post);
router.get('/home/update-subcategory/:slug', requireAuth, isAccountActive, slugValidator, authController.updateSubcategory_get);
router.post('/home/update-subcategory/:slug',requireAuth, isAccountActive,  slugValidator, editSubValidator, authController.updateSubcategory_post);
router.get('/home/delete-subcategory/:slug',requireAuth, isAccountActive,  slugValidator, authController.deleteSubcategory_get);
router.post('/home/delete-subcategory/:slug', requireAuth, isAccountActive, slugValidator, authController.deleteSubcategory_post);

router.post('/home/subcategory-status/:slug', requireAuth, isAccountActive, slugValidator, authController.subcategoryStatus_post);
//#endregion

//#region Image
router.get('/home/images', authController.gallery_get);
router.get('/home/images/add', authController.addImages_get);
router.post('/home/images/add', authController.addImages_post);
router.get('/home/update-image/:identifier', authController.updateImage_get);
router.post('/home/update-image/:identifier', editImageDetails, authController.updateImage_post);
router.get('/home/delete-image/:identifier', authController.deleteImage_get);
router.post('/home/delete-image/:identifier', authController.deleteImage_post);
//#endregion

//#region Tags
router.get('/home/tags',requireAuth, isAccountActive, authController.tags);
router.get('/home/add-tag',requireAuth, isAccountActive, authController.addTag_get);
router.post('/home/add-tag',requireAuth, isAccountActive, addTagValidator, authController.addTag_post);
router.get('/home/update-tag/:slug',requireAuth, isAccountActive, slugValidator, authController.updateTag_get);
router.post('/home/update-tag/:slug',requireAuth, isAccountActive, slugValidator, editTagValidator, authController.updateTag_post);
router.get('/home/delete-tag/:slug',requireAuth, isAccountActive, slugValidator, authController.deleteTag_get);
router.post('/home/delete-tag/:slug',requireAuth, isAccountActive, slugValidator, authController.deleteTag_post);
//#endregion

//#region Sizes
router.get('/home/sizes', requireAuth,isAccountActive, authController.sizes);
router.get('/home/add-size', requireAuth,isAccountActive, authController.addSize_get);
router.post('/home/add-size', requireAuth,isAccountActive, authController.addSize_post);
router.get('/home/update-size/:identifier', requireAuth,isAccountActive, authController.updateSize_get);
router.post('/home/update-size/:identifier', requireAuth,isAccountActive, authController.updateSize_post);
router.get('/home/delete-size/:identifier', requireAuth,isAccountActive, authController.deleteSize_get);
router.post('/home/delete-size/:identifier', requireAuth,isAccountActive, authController.deleteSize_post);
//#endregion

//#region Product
router.get('/home/product', requireAuth, isAccountActive, authController.productPosting);
router.get('/home/add-product', requireAuth, isAccountActive, authController.addProduct_get);
router.post('/home/add-product', requireAuth, isAccountActive, addProductVal, authController.addProduct_post);
router.get('/home/view-product/:slug', requireAuth, isAccountActive, slugValidator, authController.viewProduct_get);
router.get('/home/update-product/:slug', requireAuth, isAccountActive, slugValidator, authController.updateProduct_get);
router.post('/home/update-product/:slug', requireAuth, isAccountActive, editProductVal, authController.updateProduct_post);
router.get('/home/delete-product/:slug', requireAuth, isAccountActive, slugValidator, authController.deleteProduct_get);
router.post('/home/delete-product/:slug', requireAuth, isAccountActive, slugValidator, authController.deleteProduct_post);
router.post('/home/product-showcase/:slug', requireAuth, isAccountActive, slugValidator, authController.showcase_post);
router.post('/home/product-recommendation/:slug', requireAuth, isAccountActive, slugValidator, authController.recommendation_post);
router.post('/home/product-status/:slug', requireAuth, isAccountActive, slugValidator, authController.changeStatus_post);
//#endregion

//#region Blog
router.get('/home/blogs', requireAuth, isAccountActive, authController.blogs)
router.get('/home/view-blog/:slug', requireAuth, isAccountActive, authController.viewBlog_get)

router.get('/home/add-blog', requireAuth, isAccountActive, authController.addBlog_get);
router.post('/home/add-blog', requireAuth, isAccountActive, authController.addBlog_post);

router.get('/home/update-blog/:slug', requireAuth, isAccountActive, slugValidator, authController.updateBlog_get);
router.post('/home/update-blog', requireAuth, isAccountActive, editValidator, authController.updateBlog_post);

router.get('/home/delete-blog/:slug', requireAuth, isAccountActive, authController.deleteBlog_get);
router.post('/home/delete-blog/:slug', requireAuth, isAccountActive, authController.deleteBlog_post);
//#endregion

//#region User
router.get('/home/users', requireAuth,isAccountActive, onlyAdmin, authController.users);
router.get('/home/view-user/:identifier', requireAuth, isAccountActive,  onlyAdmin, authController.viewUser_get);

router.get('/home/update-user/:identifier', requireAuth, isAccountActive,  onlyAdmin, authController.updateUser_get);
router.post('/home/update-user/:identifier', requireAuth, isAccountActive,  onlyAdmin, authController.updateUser_post);

router.get('/home/delete-user/:identifier', requireAuth, isAccountActive,  onlyAdmin, authController.deleteUser_get);
router.post('/home/delete-user/:identifier', requireAuth, isAccountActive,  onlyAdmin, authController.deleteUser_post);
//#endregion



router.get('/home/add-product/getsubcategories/:id', authController.getSubcatgories);
router.get('/home/update-product/getsubcategories/:id', authController.getSubcatgories);

// router.get('/home/update-product/<str:page>/getsubcategories/:slug', authController.getSubcatgoriesUpdate);
// router.get('/home/add-product/getimages', authController.getimages );
router.get('/home/imagesAjax', authController.imagesAjax );
// router.get('/home/update-product/:slug/imagesAjax', authController.imagesAjaxUpdate );





module.exports = router;