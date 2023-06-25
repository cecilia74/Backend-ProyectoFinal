import { ProductsModel } from "../DAO/models/products.model.js";

class productServise {


    async getAll(queryParams) {
        const { limit = 5, page = 1, query, sort } = queryParams;
        const filter = {};
        if (query) {
            filter.$or = [{ category: query }];
        }
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort === "desc" ? "-price" : "price",
        };
        const products = await ProductsModel.paginate(filter, options);
        const response = {
            status: "success",
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.hasPrevPage ? products.prevPage : null,
            nextPage: products.hasNextPage ? products.nextPage : null,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage
                ? `/api/products?limit=${limit}&page=${products.prevPage}`
                : null,
            nextLink: products.hasNextPage
                ? `/api/products?limit=${limit}&page=${products.nextPage}`
                : null,
        }
    }
    


    async getAll() {
            const products = await ProductsModel.find({});
            return products;
        }
    async getOne(pid) {
            const product = await ProductsModel.findOne({ _id: pid });
            if (!product) {
                throw new Error("product not found.");
            }
            return product;
        }
    async createOne(body) {
            const { title, description, category, price, code, stock } = body;
            oductCreated = await ProductsModel.create({
                title,
                description,
                price,
                category,
                code,
                stock,
            });
            return productCreated;
        }
    

    async deleteOne(pid) {
            const productDelete = await ProductsModel.findByIdAndDelete(pid);
            if (!productDelete) {
                throw new Error("product not found.");
            }
            return productDelete;
        }

    async updateOne(pid, body) {
            const { title, description, category, price, code, stock } = body;
            if (!title || !description || !category || !price || !code || !stock) {
                throw new Error("all fields are required.");
            }
            const productUpdate = await ProductsModel.updateOne(
                { _id: pid },
                {
                    title,
                    description,
                    category,
                    price,
                    code,
                    stock,
                }
            );
            return productUpdate;
        }
    }

    export const ProductServise = new productServise();