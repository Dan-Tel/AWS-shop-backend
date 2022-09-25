import { getOneProduct, createResponse } from "./functions";
import { constants } from "http2";

export const handler = async (id) => {
  try {
    const product = await getOneProduct(id);

    if (!product) {
      throw "Product not found";
    }
    return createResponse(constants.HTTP_STATUS_OK, product);
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: error,
    });
  }
};
