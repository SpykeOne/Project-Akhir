const { Product, Category, ProductCategory } = require ("../lib/sequelize")
const { Op } = require("sequelize")

const categoryController = {

    getAllCategory: async (req, res) => {
        try{
            const findCategory = await Category.findAll({
                order:[['createdAt', 'ASC']]
            })
            return res.status(200).json({
                message: "fetched data category",
                results : findCategory,
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "error"
            })
        }
    },

    addCategory: async (req, res) => {
        try {
            const { name } = req.body
            const { filename } = req.file

            await Category.create({
                name,
                category_img: `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH}`
            })
            return res.status(200).json({
                message: "New category added"
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Error adding category"
            });
        }
    },

    deleteCategory: async (req, res) => {
        try{
            const { id } = req.params;

            await Category.destroy({
                where: {
                    id,
                }
            });

            return res.status(200).json({
                message: "Category deleted",
            });

        } catch (err) {

            console.log(err)

            res.status(500).json({
                message: "Error deleting category",
            });
        }
    },

    editCategory: async (req, res) => {
        try{
            const { id } = req.params;

            const { name } = req.body

            const { filename } = req.file

            await Category.update(
                {
                    name,
                    category_img
                },
                {
                    where: {
                        id,
                    },
                }
            );

            return res.status(200).json({
                message: "Category edited"
            });

        } catch (err) {
            
            console.log(err)
            return res.status(500).json({
                message: "Error editing category"
            })
        }
    }
};

module.exports = categoryController;