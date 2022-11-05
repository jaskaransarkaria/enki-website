import { searchProducts } from "./search";

const mockProdArr = [
  {
    Id: 123,
    Name: "Red jacket",
    SalePrice: 1000,
    CurrentStock: 1,
    CategoryId: 999,
    Description: "waterproof",
    ProductImages: [],
    ProductTags: [],
    VariantGroupId: null,
    ProductDetails: {
      DetailedDescription: "ruberry",
    },
    SellOnWeb: true,
    IsArchived: false,
  },
  {
    Id: 456,
    Name: "Blue jacket",
    SalePrice: 2000,
    CurrentStock: 1,
    CategoryId: 999,
    Description: "felt",
    ProductImages: [],
    ProductTags: [],
    VariantGroupId: null,
    ProductDetails: {
      DetailedDescription: "light",
    },
    SellOnWeb: true,
    IsArchived: false,
  },
  {
    Id: 789,
    Name: "Purple jacket",
    SalePrice: 3000,
    CurrentStock: 1,
    CategoryId: 999,
    Description: "leathery",
    ProductImages: [],
    ProductTags: [],
    VariantGroupId: null,
    ProductDetails: {
      DetailedDescription: "heavy",
    },
    SellOnWeb: true,
    IsArchived: false,
  },
];

describe("GIVEN searchProducts()", () => {
  it("WHEN there is a match on the product name THEN return the matches", () => {
    const searchTerm = new RegExp(/jacket/i);
    expect(searchProducts(searchTerm, mockProdArr)).toStrictEqual(mockProdArr);
  });

  it("WHEN there is a match on product description name THEN return the matches", () => {
    const searchTerm = new RegExp(/leathery/i);
    expect(searchProducts(searchTerm, mockProdArr)).toStrictEqual([
      mockProdArr[2],
    ]);
  });

  it("WHEN there is a match on product detailed description name THEN return the matches", () => {
    const searchTerm = new RegExp(/light/i);
    expect(searchProducts(searchTerm, mockProdArr)).toStrictEqual([
      mockProdArr[1],
    ]);
  });

  it("WHEN a product IsArchived THEN don't show it in the matches", () => {
    const searchTerm = new RegExp(/jacket/i);
    const mockIsArchived = {
      Id: 789,
      Name: "Multi-coloured jacket",
      SalePrice: 3000,
      CurrentStock: 1,
      CategoryId: 999,
      Description: "sequin",
      ProductImages: [],
      ProductTags: [],
      VariantGroupId: null,
      ProductDetails: {
        DetailedDescription: "fancy",
      },
      SellOnWeb: true,
      IsArchived: true,
    };
    expect(
      searchProducts(searchTerm, [...mockProdArr, mockIsArchived])
    ).toStrictEqual(mockProdArr);
    expect(
      searchProducts(searchTerm, [...mockProdArr, mockIsArchived])
    ).not.toContain(mockIsArchived);
  });

  it("WHEN a product not SellOnWeb THEN don't show it in the matches", () => {
    const searchTerm = new RegExp(/jacket/i);
    const mockSellOnWeb = {
      Id: 789,
      Name: "Multi-coloured jacket",
      SalePrice: 3000,
      CurrentStock: 1,
      CategoryId: 999,
      Description: "sequin",
      ProductImages: [],
      ProductTags: [],
      VariantGroupId: null,
      ProductDetails: {
        DetailedDescription: "fancy",
      },
      SellOnWeb: false,
      IsArchived: false,
    };
    expect(
      searchProducts(searchTerm, [...mockProdArr, mockSellOnWeb])
    ).toStrictEqual(mockProdArr);
    expect(
      searchProducts(searchTerm, [...mockProdArr, mockSellOnWeb])
    ).not.toContain(mockSellOnWeb);
  });
});
