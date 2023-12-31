import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import SingleProduct from "./SingleProduct.svelte";

describe("Given SingleProduct", () => {
  describe("WHEN rendered without props", () => {
    it("THEN show no product or product related actions", () => {
      const { container } = render(SingleProduct);
      expect(container.children).toHaveLength(1);
    });
  });
  describe("WHEN rendered with props", () => {
    it("THEN show the product", () => {
      render(SingleProduct, {
        product: {
          Id: 123,
          Name: "Red jacket",
          SalePrice: 1000,
          CurrentStock: 1,
          CategoryId: 999,
          Description: "big animal",
          ProductImages: [
            {
              ImageUrl: "/foobar-0.jpg",
            },
          ],
          ProductTags: [],
          VariantGroupId: null,
          ProductDetails: {
            DetailedDescription: "heavy",
          },
          SellOnWeb: true,
          IsArchived: false,
        },
      });
      expect(
        screen.getByRole("heading", { name: /red jacket/i })
      ).toHaveTextContent("Red jacket");
    });

    it("THEN show the detailed product (with thumbnails)", () => {
      render(SingleProduct, {
        showDetailedView: true,
        product: {
          Id: 456,
          CategoryId: 999,
          Name: "Blue jacket",
          Description: "A very blue jacket",
          SalePrice: 2000,
          CurrentStock: 2,
          ProductImages: [
            {
              ImageUrl: "/foobar-0.jpg",
            },
            {
              ImageUrl: "/foobar-1.jpg",
            },
          ],
          ProductTags: [],
          ProductDetails: null,
          VariantGroupId: null,
          SellOnWeb: true,
          IsArchived: false,
        },
      });

      const multiImages = screen.getAllByTestId("swipe-img");

      expect(
        screen.getByRole("heading", { level: 4, name: "Blue jacket" })
      ).toHaveTextContent("Blue jacket");
      expect(
        screen.getByRole("heading", { level: 4, name: /very/i })
      ).toHaveTextContent("A very blue jacket");
      expect(
        screen.getByRole("heading", { level: 4, name: /2000/i })
      ).toHaveTextContent("£2000.00");
      expect(multiImages).toHaveLength(2);
      expect(multiImages[0]).toHaveAttribute(
        "src",
        "https://storage.googleapis.com/enki-website/foobar-0"
      );
      expect(multiImages[1]).toHaveAttribute(
        "src",
        "https://storage.googleapis.com/enki-website/foobar-1"
      );
      expect(
        screen.getByRole("button", { name: "Add to Basket" })
      ).toBeInTheDocument();
    });

    it("THEN show no image", async () => {
      render(SingleProduct, {
        showDetailedView: true,
        product: {
          Id: 789,
          Name: "Green jacket",
          Description: "greeny",
          SalePrice: 3000,
          CurrentStock: 3,
          CategoryId: 999,
          ProductImages: [],
          ProductTags: [],
          ProductDetails: null,
          VariantGroupId: null,
          SellOnWeb: true,
          IsArchived: false,
        },
      });
      expect(
        screen.getByRole("heading", { level: 4, name: "Green jacket" })
      ).toHaveTextContent("Green jacket");
      expect(
        screen.getByRole("heading", { level: 4, name: /greeny/i })
      ).toHaveTextContent("greeny");
      expect(
        screen.getByRole("heading", { level: 4, name: /3000/i })
      ).toHaveTextContent("£3000");
      expect(screen.queryAllByAltText(/789/i)).toHaveLength(0);
      expect(
        screen.getByRole("button", { name: "Add to Basket" })
      ).toBeInTheDocument();
    });

    it("THEN show the variant category", () => {
      render(SingleProduct, {
        product: null,
        variantCategory: {
          ParentId: 999,
          Id: 123,
          Name: "Variant",
          NominalCode: "",
          Children: [],
        },
      });

      expect(
        screen.getByRole("heading", { level: 3, name: "Variant" })
      ).toHaveTextContent("Variant");
      expect(
        screen.getByRole("heading", { level: 3, name: "Individually priced" })
      ).toBeInTheDocument();
    });

    it("AND the product is low in stock THEN show the low in stock badge", () => {
      render(SingleProduct, {
        product: {
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
        },
      });

      expect(screen.queryByAltText(/low in stock/)).toBeInTheDocument();
      expect(screen.queryByAltText(/out/i)).not.toBeInTheDocument();
    });

    it("AND the product is out of stock THEN show the out in stock badge", () => {
      render(SingleProduct, {
        product: {
          Id: 123,
          Name: "Red jacket",
          SalePrice: 1000,
          CurrentStock: 0,
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
        },
      });

      expect(screen.getByAltText(/out of stock/)).toBeInTheDocument();
      expect(screen.queryByAltText(/low in stock/)).not.toBeInTheDocument();
    });
  });
});
