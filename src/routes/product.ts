import express from 'express'
import Product from '../models/product'
import authMiddleware from '../middleware/Auth';
const router = express.Router()

// TODO: Verificar que el user de la request si es el dueno del producto con request.userId
// para los endpoints que requieran acceder a un producto creado


// Getting all
router.get('/', authMiddleware, async (req: any, res) => {
    try {
      const products = await Product.find({ownerId: req.userId})
      res.json(products)
    } catch (err : any ) {
      res.status(500).json({ message: err.message })
    }
  })

// Getting One
router.get('/:id', [authMiddleware , getProduct], (_req : any, res : any) => {
  res.json(res.product)
})

// Creating one
router.post('/', authMiddleware, async (req : any, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    brand: req.body.brand,
    ownerId: req.userId,
  })
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch (err : any) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', [authMiddleware, getProduct], async (req : any, res : any) => {
  
  if(res.product.ownerId != req.userId ){
    res.status(403).json({ message: "this is not your product therefore you cannot edit it" })
    return
  }
    
  if (req.body.name != null) {
    res.product.name = req.body.name
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  if (req.body.quantity != null) {
    res.product.quantity = req.body.quantity
  }
  if (req.body.brand != null) {
    res.product.brand = req.body.brand
  }
  
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err : any) {
    res.status(400).json({ message: err.message })
  }

})

// Deleting One
router.delete('/:id', [authMiddleware, getProduct], async (req : any, res  : any) => {

  if(res.product.ownerId != req.userId ){
    res.status(403).json({ message: "this is not your product therefore you cannot delete it" })
    return
  }

  try {
    await res.product.remove()
    res.json({ message: 'Deleted Product' })
  } catch (err  : any) {
    res.status(500).json({ message: err.message })
  }
  
})

async function getProduct(req : any, res : any, next : any) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err  : any) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
}

export default router