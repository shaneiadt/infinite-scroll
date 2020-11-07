export function setAttributes(
  element: HTMLElement,
  attributes: { [key: string]: string },
): void {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
