import { updateBasket } from "./basket";

const mockProduct = {
  Id: 123,
  Name: "Red jacket",
  SalePrice: 1000,
  CurrentStock: 1,
  CategoryId: 999,
  Description: "big animal",
  ProductImages: [],
  ProductTags: [],
  VariantGroupId: null,
  ProductDetails: {
    DetailedDescription: "heavy",
  },
  SellOnWeb: true,
  IsArchived: false,
};

describe("GIVEN updateBasket()", () => {
  it("WHEN adding a new item THEN add it to the basket", () => {
    expect(updateBasket(mockProduct, [], "newItem")).toStrictEqual([
      {
        id: mockProduct.Id,
        categoryId: mockProduct.CategoryId,
        name: mockProduct.Name,
        quantity: 1,
        price: mockProduct.SalePrice,
        currentStock: mockProduct.CurrentStock,
        giftWrap: false,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
      },
    ]);
  });

  it("WHEN incrementing the quantity of an item already in a basket THEN increment the quantity", () => {
    expect(
      updateBasket(
        mockProduct,
        [
          {
            id: mockProduct.Id,
            categoryId: mockProduct.CategoryId,
            name: mockProduct.Name,
            quantity: 1,
            price: mockProduct.SalePrice,
            currentStock: mockProduct.CurrentStock,
            giftWrap: false,
            giftDescription: "",
            giftWrapToUse: "Standard brown paper",
          },
        ],
        "incrementQuantity"
      )
    ).toStrictEqual([
      {
        id: mockProduct.Id,
        categoryId: mockProduct.CategoryId,
        name: mockProduct.Name,
        quantity: 2,
        price: mockProduct.SalePrice,
        currentStock: mockProduct.CurrentStock,
        giftWrap: false,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
      },
    ]);
  });

  it("WHEN decrementing the quantity of an item already in a basket THEN decrement the quantity", () => {
    expect(
      updateBasket(
        mockProduct,
        [
          {
            id: mockProduct.Id,
            categoryId: mockProduct.CategoryId,
            name: mockProduct.Name,
            quantity: 2,
            price: mockProduct.SalePrice,
            currentStock: mockProduct.CurrentStock,
            giftWrap: false,
            giftDescription: "",
            giftWrapToUse: "Standard brown paper",
          },
        ],
        "decrementQuantity"
      )
    ).toStrictEqual([
      {
        id: mockProduct.Id,
        categoryId: mockProduct.CategoryId,
        name: mockProduct.Name,
        quantity: 1,
        price: mockProduct.SalePrice,
        currentStock: mockProduct.CurrentStock,
        giftWrap: false,
        giftDescription: "",
        giftWrapToUse: "Standard brown paper",
      },
    ]);
  });

  it("WHEN decrementing the quantity of an item already in a basket and with a quantity of 1 THEN remove the item", () => {
    expect(
      updateBasket(
        mockProduct,
        [
          {
            id: mockProduct.Id,
            categoryId: mockProduct.CategoryId,
            name: mockProduct.Name,
            quantity: 1,
            price: mockProduct.SalePrice,
            currentStock: mockProduct.CurrentStock,
            giftWrap: false,
            giftDescription: "",
            giftWrapToUse: "Standard brown paper",
          },
        ],
        "decrementQuantity"
      )
    ).toStrictEqual([]);
  });
});
