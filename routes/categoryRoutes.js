// req router for category routes
const router = require('express').Router();
const { CategoryModel, ProductModel } = require('../models')
// req category models in 

router.get('/', async (req, res)=>{
    try{
        const category = await CategoryModel.findAll({ include: [{ model: ProductModel }]})
        res.status(200).json(category)

    } catch (err) {
        res.status(500).json({ message: 'ERROR; Category not found!' })
    }
})

router.get('/:id', async (req, res)=> {
    try{
        const category = await CategoryModel.findByPk(req.params.id, { include: [{ model: ProductModel }]});
        if(!category){
            res.status(404).json({ message: 'ERROR; ID not found!'});
            return;
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: 'ERROR finding ID!'})
    }
})

router.post('/', async (req, res) => {
    try{
        const newCategory = await CategoryModel.create(req.body);
        res.status(200).json(newCategory);
    } catch (err){
        res.status(400).json({ message: "ERROR creating new category!"})
    }
});



//get

//post

// put

// delete


module.exports = categoryRoute;