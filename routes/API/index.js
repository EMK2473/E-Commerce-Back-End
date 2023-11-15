// create router variable for usage
// req express for new instance of express.router()
const router = require('express').Router();
// req each model in from each type of model routes
const categoryRoute = require('./categoryRoutes');
const productRoute = require('./productRoutes');
const tagRoute = require('./tagRoutes');
// make router use category router for /categories if exists
router.use('/categories', categoryRoute); 
// make router use category router for /products 
router.use('/products', productRoute);
// make router use category router for /tags
router.use('/tags', tagRoute);





// expor the router
module.exports = router;