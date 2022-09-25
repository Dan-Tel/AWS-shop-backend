import { handler as getProductsList } from "../handlers/getProductsList";
import producsList from "../productsList.json";

test("Getting products list", async () => {
  const { statusCode, body } = await getProductsList();

  expect(statusCode).toBe(200);

  const data = JSON.parse(body);
  expect(data).toEqual(producsList);
});
