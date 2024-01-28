const User = require('./User')
const Product = require('./Product')
const Image = require('./Image')
const ProductCart = require('./ProductCart')
const Category = require('./Category')
const Purchase = require('./Purchase')

Product.hasMany(Image)
Image.belongsTo(Product)

ProductCart.belongsTo(User)
User.hasMany(ProductCart)

ProductCart.belongsTo(Product)
Product.hasMany(ProductCart)

Category.hasMany(Product)
Product.belongsTo(Category)

Purchase.belongsTo(Product)
Product.hasMany(Purchase)

Purchase.belongsTo(User)
User.hasMany(Purchase)