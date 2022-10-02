import AWS from "aws-sdk";

import { createResponse } from "./functions/response";
import { constants } from "http2";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async () => {
  try {
    const products = await getProductsFromDB();

    console.log(`Response:\nProducts List: ${products}`);
    return createResponse(constants.HTTP_STATUS_OK, products);
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: "Internal server error",
    });
  }
};

const getProductsFromDB = async () => {
  const products = await getProductsTable();
  const stocks = await getStocksTable();

  products.forEach((product) => {
    product["count"] = stocks.find(
      (stock) => stock.product_id == product.id
    ).count;
  });

  return products;
};

const getProductsTable = async () => {
  const params = {
    TableName: "Products",
  };

  let scanResults = [];
  let items;

  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");

  return scanResults;
};

const getStocksTable = async () => {
  const params = {
    TableName: "Stocks",
  };

  let scanResults = [];
  let items;

  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");

  return scanResults;
};
