import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})



// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }

    res.json(product)
})

// @desc DELETE single product
// @route DELETE /api/products/:id
// @access Private/admin
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.deleteOne()
        res.json({message: 'Product Removed'})
    } else {
        res.status(404)
        throw new Error('Product not Found')
    }

    res.json(product)
})


// @desc CREATE single product
// @route POST /api/products/
// @access Private/admin
const createProduct = asyncHandler( async (req, res) => {
   const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    image1: '/images/sample.jpg',
    image2: '/images/sample.jpg',
    image3: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'

   })

   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})


// @desc Update single product
// @route Put /api/products/:id
// @access Private/admin
const updateProduct = asyncHandler( async (req, res) => {
    const {name, price, description, image, image1, image2, image3, brand, category, countInStock, } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.image1 = image1
        product.image2 = image2
        product.image3 = image3
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
 

 })







export {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct
} 