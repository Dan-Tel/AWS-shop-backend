import { getAllProducts, createResponse } from "./functions";
import { constants } from "http2";

export const handler = async () => {
  try {
    const products = (await getAllProducts()) || [];
    return createResponse(constants.HTTP_STATUS_OK, products);
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: error,
    });
  }
};
