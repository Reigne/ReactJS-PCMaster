const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const {
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview, 
    getProductReviews, 
    getAdminProducts, 
    deleteReview,
    productSales,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.get('/products', getProducts);
router.put('/review',isAuthenticatedUser, createProductReview);
router.get('/reviews',isAuthenticatedUser, getProductReviews)
router.get('/admin/products', isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10),newProduct);
router.get('/product/:id', getSingleProduct);
router.route('/reviews').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteReview);
router.get('/admin/products/sales', productSales);


module.exports = router;