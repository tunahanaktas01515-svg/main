import next from "eslint-config-next";

const eslintConfig = [
  ...next,
  {
    // Context providers intentionally hydrate persisted state from
    // localStorage inside an effect after mount to avoid SSR/client
    // mismatches. This one-time sync is the SSR-safe pattern.
    files: ["src/context/**/*.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
