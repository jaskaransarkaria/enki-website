export const clickOutside: (
  node: HTMLElement,
  { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void },
) => void = (
  node: HTMLElement,
  { enabled: initialEnabled, cb }: { enabled: boolean; cb: () => void },
) => {
  const handleOutsideClick: ({ target }: { target: HTMLElement }) => void = ({
    target,
  }: {
    target: HTMLElement;
  }) => {
    if (!node.contains(target) && target.id !== "mc-embedded-subscribe") {
      cb();
    }
  };

  function update({ enabled }: { enabled: boolean }) {
    if (enabled) {
      window.addEventListener("click", handleOutsideClick as any);
    } else {
      window.removeEventListener("click", handleOutsideClick as any);
    }
  }

  update({ enabled: initialEnabled });
  return {
    update,
    destroy() {
      window.removeEventListener("click", handleOutsideClick as any);
    },
  };
};
