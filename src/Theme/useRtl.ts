import { useState } from "react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export const useRtl = () => {
  const [rtl, setRtl] = useState(false);

  const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const ltrCache = createCache({
    key: "mui",
  });
  return {
    rtl,
    setRtl,
    value: rtl ? rtlCache : ltrCache,
  };
};