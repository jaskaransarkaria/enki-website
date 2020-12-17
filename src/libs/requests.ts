  const orderCatergories = (resp: object[]) =>
      resp.sort((a: object, b: object) => (a.Name < b.Name ? -1 : 1));

export const fetchCategories = async () => {
  const response = await fetch(`${process.env.SERVER_URL}/categories`);
  const parsedResult = JSON.parse(await response.json());
  return orderCatergories(parsedResult);
};