import { getOneProduct, createResponse } from "./functions";
import { constants } from "http2";

export const handler = async (event) => {
  try {
    const product = await getOneProduct(event.pathParameters.id);

    if (!product)
      return createResponse(constants.HTTP_STATUS_NOT_FOUND, {
        error: "Product not found",
      });
    return createResponse(constants.HTTP_STATUS_OK, product);
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: error,
    });
  }
};
