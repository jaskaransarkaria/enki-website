import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import Checkout from "./Checkout.svelte";
import { loadStripe } from "@stripe/stripe-js/pure";
import { createCheckoutSession } from "./createCheckoutSession";

jest.mock("@stripe/stripe-js/pure");
jest.mock("./createCheckoutSession");

describe("GIVEN Checkout", () => {
  beforeEach(() => jest.clearAllMocks());
  describe("WHEN rendered", () => {
    it("THEN shows the checkout", () => {
      render(Checkout);
      expect(screen.getByText("Checkout")).toBeInTheDocument();
      expect(loadStripe).toHaveBeenCalledTimes(1);
    });

    it("THEN successfully creates a checkout and redirects to checkout", () => {
      (createCheckoutSession as jest.Mock).mockImplementationOnce(() =>
        console.log("success")
      );
      render(Checkout);

      expect(createCheckoutSession).toHaveBeenCalledTimes(0);
      expect(screen.getByText("Checkout")).toBeInTheDocument();
      userEvent.click(screen.getByRole("button", { name: /checkout/i }));
      expect(createCheckoutSession).toHaveBeenCalledTimes(1);
    });
  });
});
