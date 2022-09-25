import data from "../productsList.json";

export const getAllProducts = async () => data;

export const getOneProduct = async (id) =>
  data.find((product) => product.id == id);

export const createResponse = (statusCode, body) => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET",
    },
    body: JSON.stringify(body, null, 2),
  };
};
