import { handler as getProductsById } from "../handlers/getProductsById";
import producsList from "../productsList.json";

test("Getting product by correct id", async () => {
  const CORRECT_PRODUCT_ID = "7567ec4b-b10c-48c5-9345-fc73c48a80aa";
  const { statusCode, body } = await getProductsById(CORRECT_PRODUCT_ID);

  expect(statusCode).toBe(200);

  const data = JSON.parse(body);
  expect(data).toEqual(
    producsList.find((product) => product.id == CORRECT_PRODUCT_ID)
  );
});

test("Getting product by incorrect id", async () => {
  const INCORRECT_PRODUCT_ID = "not valid id";
  const { statusCode, body } = await getProductsById(INCORRECT_PRODUCT_ID);

  expect(statusCode).toBe(404);

  const data = JSON.parse(body);
  expect(data).toEqual({
    error: "Product not found",
  });
});
