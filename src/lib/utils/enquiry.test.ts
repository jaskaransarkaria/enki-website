import { describe, it, expect } from "vitest";
import { buildMailto, formFields } from "./enquiry";

const decodeBody = (href: string) =>
  decodeURIComponent(new URL(href).searchParams.get("body") ?? "");

describe("GIVEN enquiry.ts", () => {
  describe("GIVEN buildMailto()", () => {
    it("WHEN given fields THEN lists answered ones in the body", () => {
      const href = buildMailto("a@b.com", "Hello there", [
        ["Your name", "Sam"],
        ["Phone", "  "],
        ["Notes", "line one\nline two"],
      ]);

      expect(href.startsWith("mailto:a@b.com?subject=Hello%20there&")).toBe(
        true,
      );
      expect(decodeBody(href)).toBe(
        "Your name: Sam\nNotes:\nline one\nline two",
      );
    });

    it("WHEN given a footer THEN appends it after a blank line", () => {
      const href = buildMailto("a@b.com", "Hi", [["Name", "Sam"]], "Thanks");
      expect(decodeBody(href)).toBe("Name: Sam\n\nThanks");
    });
  });

  describe("GIVEN formFields()", () => {
    it("WHEN a form has labelled controls THEN pairs labels with values", () => {
      const form = document.createElement("form");
      form.innerHTML = `
        <label for="n">Your name</label><input id="n" name="name" value="Sam" />
        <select name="metal"><option value="Gold" selected>Gold</option></select>
        <button type="submit" name="go">Send</button>
      `;

      expect(formFields(form)).toEqual([
        ["Your name", "Sam"],
        ["metal", "Gold"],
      ]);
    });
  });
});
