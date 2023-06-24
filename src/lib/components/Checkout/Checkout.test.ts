import "@testing-library/jest-dom";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/svelte";
import Checkout from "./Checkout.svelte";
import { loadStripe } from "@stripe/stripe-js/pure";
import { createCheckoutSession } from "./createCheckoutSession";

vi.mock("@stripe/stripe-js/pure");
vi.mock("./createCheckoutSession");

describe("GIVEN Checkout", () => {
  afterEach(() => vi.clearAllMocks());

  describe("WHEN rendered", () => {
    it("THEN shows the checkout", () => {
      render(Checkout);
      expect(screen.getByText("Checkout")).toBeInTheDocument();

      // expect(loadStripe).toHaveBeenCalledTimes(1);
    });

    it("THEN successfully creates a checkout and redirects to checkout", async () => {
      (createCheckoutSession as jest.Mock).mockImplementationOnce(() =>
        console.log("success")
      );
      render(Checkout);

      expect(createCheckoutSession).toHaveBeenCalledTimes(0);
      expect(screen.getByText("Checkout")).toBeInTheDocument();
      await userEvent.click(screen.getByRole("button", { name: "Checkout" }));
      expect(createCheckoutSession).toHaveBeenCalledTimes(1);
    });
  });
});
