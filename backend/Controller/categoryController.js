import asyncHandler from "../Middleware/asyncHandler.js";
import Category from "../Models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
    try {

        const { name } = req.body;
        if (!name.trim()) {
            res.status(400).json({error:"name is required!"})
        }
        const existingCategory = await Category.findOne({ name })
        if (existingCategory) {
            res.status(400).json({error:"this category already exists"})
        }

        const newCategory = new Category({ name })
        await newCategory.save()
        res.status(201).json(newCategory)
    } catch (err) {
        console.error(err)
        res.status(401).json(err);
    }

})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;
        if (!name.trim() || !id) {
            res.status(400).json({error:"name is required or no id is given!"})
        }
        console.log(name, id);
        
        const existingCategory = await Category.findById(id)
        if (existingCategory) {
            existingCategory.name = name;
             await existingCategory.save();

            res.status(200).json( existingCategory )
        }
        else res.status(400).json("no such category exists")
    }
    catch (err) {
        console.error(err)
        res.status(401).json(err);
    }

})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.status(400).json({error:"id is required"})
        const existingCategory = await Category.findById(id)
        if (existingCategory) {
            await Category.findByIdAndDelete(id)
            res.status(200).json({message:"Category deleted "})
        }
        else res.status(400).json({error:"no such category exists"})
    }
    catch (err) {
        console.error(err)
        res.status(401).json(err);
    }

})

const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories )
    } 
    catch (error) {
        res.status(400).json(error)
    }
})

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
});
export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    readCategory
}