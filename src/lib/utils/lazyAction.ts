export const lazy = (node, data) => {
  if (data.loaded.has(data.src)) {
    node.setAttribute("src", data.src);
  } else {
    const img = new Image();
    img.src = data.src;
    img.onload = () => {
      data.loaded.set(data.src, img);
      node.setAttribute("src", data.src);
    };
  }

  return {
    destroy() {}, // noop
  };
};
