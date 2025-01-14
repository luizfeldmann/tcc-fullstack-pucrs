import mongoose from "mongoose";
import { IStoreProduct, StoreProductModel } from "../models/StoreProductModel";
import { IProductDetailsResponseData } from "../schemas/dto/ProductDetailsResponse";
import { ConnectDatabase } from "../singleton/Database";

/** Returns a list of all products */
export async function GetProductsList(): Promise<string[]> {
  await ConnectDatabase();
  const allProducts = await StoreProductModel.find({}).select({ _id: 1 });

  return allProducts.map((p) => p._id.toString());
}

const mapProduct = (
  p: IStoreProduct & { _id: mongoose.Types.ObjectId }
): IProductDetailsResponseData => {
  return {
    id: p._id.toString(),
    store: p.store.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    imageSrc: p.imageSrc,
  };
};

/** Returns the products from a particular store */
export async function GetProductsByStore(storeId: string): Promise<string[]> {
  await ConnectDatabase();
  const storeProducts = await StoreProductModel.find({ store: storeId });

  return storeProducts.map((p) => p._id.toString());
}

/** Gets the product by it's ID */
export async function GetProductById(
  productId: string
): Promise<IProductDetailsResponseData> {
  await ConnectDatabase();
  const product = await StoreProductModel.findById(productId);

  if (!product) return Promise.reject();

  return mapProduct(product);
}
