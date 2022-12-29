import { Router } from "express";
import { ProductApi } from "../Api/index.js";

const productRouter = Router();
productRouter.get("/", async (req, res) => {
  const products = await ProductApi.getAll();

  res.send({ success: true, data: products });
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await ProductApi.getById(Number(id));

  if (!product) {
    return res.send({
      success: false,
      data: undefined,
      message: "Product not found",
    });
  }

  res.send({ success: true, data: product });
});

productRouter.post("/", async (req, res) => {
  const { title, price, thumbnail } = req.body;

  const product = await ProductApi.save({ title, price, thumbnail });

  res.send({ success: true, data: { id: product.id } });
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  const updatedProduct = await ProductApi.updateById(id, {
    title,
    price,
    thumbnail,
  });

  res.send({ success: true, data: { updated: updatedProduct } });
});

export { productRouter };