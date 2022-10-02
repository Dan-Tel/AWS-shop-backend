import AWS from "aws-sdk";
import { v4 } from "uuid";

import { createResponse } from "./response";
import { constants } from "http2";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { count, ...rest } = body;
    const id = v4();

    await docClient
      .put({
        TableName: "Products",
        Item: {
          id,
          ...rest,
        },
      })
      .promise();

    await docClient
      .put({
        TableName: "Stocks",
        Item: {
          product_id: id,
          count: `${count}`,
        },
      })
      .promise();
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: error,
    });
  }
};
