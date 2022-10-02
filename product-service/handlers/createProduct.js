import AWS from "aws-sdk";
import { v4 } from "uuid";
import { constants } from "http2";

import { createResponse } from "./functions/response";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log(`Request:\nBody: ${body}\n`);

    if (
      !body.hasOwnProperty("title") ||
      !body.hasOwnProperty("description") ||
      !body.hasOwnProperty("price") ||
      !body.hasOwnProperty("count")
    ) {
      return createResponse(constants.HTTP_STATUS_BAD_REQUEST, {
        message: "Product data is invalid",
      });
    }

    const { count, ...rest } = body;
    const id = v4();

    const params = {
      TransactItems: [
        {
          Put: {
            Item: { id, ...rest },
            TableName: "Products",
          },
        },
        {
          Put: {
            Item: { product_id: id, count },
            TableName: "Stocks",
          },
        },
      ],
    };

    await docClient.transactWrite(params).promise();

    console.log(
      `Response:\nProducts Table info: ${{
        id,
        ...rest,
      }}\nStocks Table info: ${{
        product_id: id,
        count,
      }}`
    );
    return createResponse(constants.HTTP_STATUS_OK, { message: "OK" });
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: "Internal server error",
    });
  }
};
