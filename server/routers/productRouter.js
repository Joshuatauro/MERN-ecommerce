const router = require("express").Router()
const Product = require("../models/productSchema")


router.post('/add', async(req, res) => {
  const { productTitle, productPrice, productColors, productSize, productImg } = req.body

  try {

    if (!productTitle || !productColors || !productSize || !productPrice || !productImg) return res.status(400).json({errorMessage: "Please fill all the details"})

    const newProduct = new Product(
      {
        productPrice,
        productSize,
        productTitle,
        productColors,
        productImg
      }
    )

    const savedProduct = newProduct.save()

    res.status(200).json(
      {
        successMessage: "Added product successfully",
        data: savedProduct
      }
    )

    
  } catch (err) {
    res.status(400).json(
      {
        errorMessage: "Something went wrong, hold tight"
      }
    )
  }
})

router.get("/", async(req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(
      {
        numOfResults: products.length,
        products
      }
    )
  } catch (err) {
    res.status(400).json(
      {
        errorMessage: "Something went wrong, hold tight"
      }
    )
  }
})


router.get("/:id", async(req, res) => {
  const id = req.params.id

  try{

    const product = await Product.findById(id)

    if(product){
      res.status(200).json(
        {
          doesExists: true,
          product
        }
      )
    } else {
      res.status(404).json(
        {
          doesExists: false,
          products
        }
      )
    }

  } catch(err) {
    res.status(400).json(
      {
        errorMessage: "Something went wrong, please hold on tight",
        err: err.message
      }
    )
  }
})

//to get products within a range
router.get("/filter/lt/:lt/ht/:ht", async(req, res) => {
  const lowerLimit = req.params.lt
  const higherLimit = req.params.ht


  try {
    const products = await Product.find({productPrice: {$gt: parseInt(lowerLimit), $lt: parseInt(higherLimit)}}).sort({productPrice: 1})

    res.status(200).json(
      {
        numOfResults: products.length,
        products
      }
    )
  } catch (err) {
    res.status(400).json(
      {
        errorMessage: "Something went wrong, please hold tight"
      }
    )
  }
})




module.exports = router