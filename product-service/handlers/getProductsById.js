import AWS from "aws-sdk";

import { createResponse } from "./functions/response";
import { constants } from "http2";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  try {
    console.log(`Request:\nEvent: ${event}\nId: ${event.pathParameters.id}\n`);

    const product = await getProductFromDB(event.pathParameters.id);
    if (!product) {
      return createResponse(constants.HTTP_STATUS_NOT_FOUND, {
        error: "Product not found",
      });
    }

    console.log(`Response:\nProduct: ${product}`);
    return createResponse(constants.HTTP_STATUS_OK, product);
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: "Internal server error",
    });
  }
};

const getProductFromDB = async (id) => {
  const product = await getProductsTable(id);
  const stock = await getStocksTable(id);

  if (!product || !stock) return null;

  product["count"] = stock.count;
  return product;
};

const getProductsTable = async (id) => {
  const params = {
    TableName: "Products",
    Key: { id },
  };

  let result;
  await docClient
    .get(params, (err, data) => {
      result = Object.keys(data).length ? data.Item : null;
    })
    .promise();
  return result;
};

const getStocksTable = async (product_id) => {
  const params = {
    TableName: "Stocks",
    Key: { product_id },
  };

  let result;
  await docClient
    .get(params, (err, data) => {
      result = Object.keys(data).length ? data.Item : null;
    })
    .promise();
  return result;
};
