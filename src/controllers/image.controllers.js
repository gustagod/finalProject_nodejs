const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary,deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async (req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const file = req.file
    const { url } = await uploadToCloudinary(file)
    const { productId } = req.body

    const result = await Image.create({
        url,
        productId
    });
    return res.status(201).json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id)
    if(!image) return res.sendStatus(404).json({message:'image not found'})
    await deleteFromCloudinary(image.url)
    await image.destroy();
    return res.sendStatus(204);
});



module.exports = {
    getAll,
    create,
    remove,
}