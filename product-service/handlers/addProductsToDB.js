import AWS from "aws-sdk";
const dynamoDB = new AWS.DynamoDB();

import { createResponse } from "./response";
import { constants } from "http2";

export const handler = async () => {
  try {
    const params = {
      RequestItems: {
        Products: [
          {
            PutRequest: {
              Item: {
                id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
                title: { S: "AO Block Red" },
                description: { S: "AO Block Red" },
                price: { N: "239.99" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a0" },
                title: { S: "AO Maven 2020-2 Blue" },
                description: { S: "AO Maven 2020-2 Blue" },
                price: { N: "205.49" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a2" },
                title: { S: "AO Maven 2021 Blue" },
                description: { S: "AO Maven 2021 Blue" },
                price: { N: "225.99" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a1" },
                title: { S: "AO Maven 2022 Aluminium Green" },
                description: { S: "AO Maven 2022 Aluminium Green" },
                price: { N: "259.49" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
                title: { S: "AO Worldwide Chrome" },
                description: { S: "AO Worldwide Chrome" },
                price: { N: "449.99" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                id: { S: "7567ec4b-b10c-48c5-9345-fc73348a80a1" },
                title: { S: "Blunt Prodigy S9 Street White" },
                description: { S: "Blunt Prodigy S9 Street White" },
                price: { N: "319.99" },
              },
            },
          },
        ],
        Stocks: [
          {
            PutRequest: {
              Item: {
                product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
                count: { N: "4" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a0" },
                count: { N: "6" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a2" },
                count: { N: "7" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a1" },
                count: { N: "12" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: "7567ec4b-b10c-48c5-9345-fc73c48a80a3" },
                count: { N: "7" },
              },
            },
          },
          {
            PutRequest: {
              Item: {
                product_id: { S: "7567ec4b-b10c-48c5-9345-fc73348a80a1" },
                count: { N: "8" },
              },
            },
          },
        ],
      },
    };

    await dynamoDB
      .batchWriteItem(params, (err, data) => {
        if (err) {
          throw err;
        }
      })
      .promise();

    return createResponse(constants.HTTP_STATUS_OK, {
      message: "OK",
    });
  } catch (error) {
    return createResponse(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR, {
      error: error,
    });
  }
};
