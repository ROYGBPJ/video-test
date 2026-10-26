import "./main.js";

(function installNoLimitsPatch() {
  const patch = () => {
    const roots = [globalThis, globalThis.window, globalThis.self];

    for (const root of roots) {
      if (!root || typeof root !== "object") continue;

      for (const key of ["FETCH_TIMEOUT", "READ_TIMEOUT"]) {
        if (typeof root[key] === "number") {
          root[key] = 2147483647;
        }
      }

      if (typeof root.INITIAL_RETRY_DELAY === "number") {
        root.INITIAL_RETRY_DELAY = 0;
      }

      const libs = [
        root.libavjs,
        root.libav,
        root.videoDownloadHelper,
        root.__libavjs,
      ];

      for (const lib of libs) {
        if (!lib || typeof lib !== "object") continue;

        for (const key of ["FETCH_TIMEOUT", "READ_TIMEOUT"]) {
          if (typeof lib[key] === "number") {
            lib[key] = 2147483647;
          }
        }

        if (typeof lib.INITIAL_RETRY_DELAY === "number") {
          lib.INITIAL_RETRY_DELAY = 0;
        }
      }
    }
  };

  patch();
  setTimeout(patch, 50);
  setTimeout(patch, 500);
  setInterval(patch, 2000);
})();
