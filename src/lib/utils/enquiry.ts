export type EnquiryField = readonly [label: string, value: string];

/**
 * Builds a `mailto:` link whose body lists each answered field as
 * "Label: value". Empty answers are dropped so the email stays tidy.
 */
export function buildMailto(
  to: string,
  subject: string,
  fields: readonly EnquiryField[],
  footer?: string,
): string {
  const lines = fields
    .map(([label, value]) => [label.trim(), value.trim()] as const)
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) =>
      value.includes("\n") ? `${label}:\n${value}` : `${label}: ${value}`,
    );

  if (footer) {
    lines.push("", footer);
  }

  const params = [
    `subject=${encodeURIComponent(subject)}`,
    `body=${encodeURIComponent(lines.join("\n"))}`,
  ];

  return `mailto:${to}?${params.join("&")}`;
}

/**
 * Reads every named control in a form and pairs its value with the text of
 * its <label>, falling back to the control's name.
 */
export function formFields(form: HTMLFormElement): EnquiryField[] {
  const controls = Array.from(form.elements).filter(
    (el): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
      (el instanceof HTMLInputElement ||
        el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement) &&
      el.name.length > 0 &&
      el.type !== "submit",
  );

  return controls.map((el) => {
    const label = el.labels?.[0]?.textContent?.trim() || el.name;
    return [label, el.value] as const;
  });
}
