import { useCallback, memo, useState, useEffect, useRef } from "react";

const DPad = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusableElements, setFocusableElements] = useState([]);
  const lastClickTime = useRef(0);

  // Update focusable elements whenever DOM changes
  useEffect(() => {
    const updateFocusableElements = () => {
      const elements = Array.from(
        document.querySelectorAll(
          'button, a, [tabindex="0"], .cursor-pointer, .group-hover',
        ),
      ).filter((el) => {
        const rect = el.getBoundingClientRect();
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          window.getComputedStyle(el).display !== "none" &&
          window.getComputedStyle(el).visibility !== "hidden"
        );
      });
      setFocusableElements(elements);
    };

    updateFocusableElements();

    // Update elements when content changes
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  const highlightElement = useCallback(
    (index) => {
      // Remove previous highlight
      focusableElements.forEach((el) => el.classList.remove("dpad-highlight"));

      if (focusableElements[index]) {
        focusableElements[index].classList.add("dpad-highlight");
        setCurrentIndex(index);

        // Smooth scroll into view
        focusableElements[index].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    },
    [focusableElements],
  );

  const selectElement = useCallback(() => {
    const element = focusableElements[currentIndex];
    if (element) {
      // Trigger click event
      element.click();

      // Also focus the element
      element.focus();
    }
  }, [currentIndex, focusableElements]);

  const moveFocus = useCallback(
    (direction) => {
      if (!focusableElements.length) return;

      const currentElement = focusableElements[currentIndex];
      if (!currentElement) {
        highlightElement(0);
        return;
      }

      const currentRect = currentElement.getBoundingClientRect();
      let nextIndex = currentIndex;
      let minDistance = Infinity;

      focusableElements.forEach((element, index) => {
        if (index === currentIndex) return;

        const rect = element.getBoundingClientRect();
        const dx = rect.left - currentRect.left;
        const dy = rect.top - currentRect.top;

        switch (direction) {
          case "up":
            if (dy < 0 && Math.abs(dx) < rect.width) {
              const distance = Math.abs(dy);
              if (distance < minDistance) {
                minDistance = distance;
                nextIndex = index;
              }
            }
            break;
          case "down":
            if (dy > 0 && Math.abs(dx) < rect.width) {
              const distance = Math.abs(dy);
              if (distance < minDistance) {
                minDistance = distance;
                nextIndex = index;
              }
            }
            break;
          case "left":
            if (dx < 0 && Math.abs(dy) < rect.height) {
              const distance = Math.abs(dx);
              if (distance < minDistance) {
                minDistance = distance;
                nextIndex = index;
              }
            }
            break;
          case "right":
            if (dx > 0 && Math.abs(dy) < rect.height) {
              const distance = Math.abs(dx);
              if (distance < minDistance) {
                minDistance = distance;
                nextIndex = index;
              }
            }
            break;
        }
      });

      if (nextIndex !== currentIndex) {
        highlightElement(nextIndex);
      }
    },
    [currentIndex, focusableElements, highlightElement],
  );

  // Initialize first element highlight
  useEffect(() => {
    if (focusableElements.length && currentIndex === 0) {
      highlightElement(0);
    }
  }, [focusableElements, highlightElement]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          moveFocus("up");
          break;
        case "ArrowDown":
          moveFocus("down");
          break;
        case "ArrowLeft":
          moveFocus("left");
          break;
        case "ArrowRight":
          moveFocus("right");
          break;
        case "Enter":
          selectElement();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveFocus, selectElement]);

  return (
    <div className="w-full flex justify-center sm:hidden shrink-0">
      <div className="rounded-t-xl fixed bottom-0 w-60 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 grid grid-cols-3 gap-2 place-items-center shadow-[0_-8px_15px_rgba(0,0,0,0.3)] border-t-2 border-x-2 border-opacity-50 border-gray-600 backdrop-blur-sm bg-opacity-90 before:content-[''] before:absolute before:inset-0 before:rounded-t-xl before:bg-gradient-to-t before:from-transparent before:to-white/10 before:pointer-events-none after:content-[''] after:absolute after:inset-x-0 after:top-0 after:h-1 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent">
        <button
          className="col-start-2 bg-gradient-to-b from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 p-2 rounded-lg w-full shadow-lg border border-zinc-600 active:translate-y-0.5 active:shadow-sm transition-all"
          onClick={() => moveFocus("up")}
        >
          ▲
        </button>
        <div></div>
        <button
          className="bg-gradient-to-b from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 p-2 rounded-lg w-full shadow-lg border border-zinc-600 active:translate-y-0.5 active:shadow-sm transition-all"
          onClick={() => moveFocus("left")}
        >
          ◄
        </button>
        <button
          className="bg-gradient-to-b from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 p-2 rounded-lg w-full shadow-lg border border-zinc-600 active:translate-y-0.5 active:shadow-sm transition-all"
          onClick={selectElement}
        >
          ⏺
        </button>
        <button
          className="bg-gradient-to-b from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 p-2 rounded-lg w-full shadow-lg border border-zinc-600 active:translate-y-0.5 active:shadow-sm transition-all"
          onClick={() => moveFocus("right")}
        >
          ►
        </button>
        <button
          className="col-start-2 bg-gradient-to-b from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 p-2 rounded-lg w-full shadow-lg border border-zinc-600 active:translate-y-0.5 active:shadow-sm transition-all"
          onClick={() => moveFocus("down")}
        >
          ▼
        </button>
      </div>
    </div>
  );
});

DPad.displayName = "DPad";

export default DPad;
