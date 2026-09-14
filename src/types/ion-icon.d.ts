import type { HTMLAttributes } from "react";

/**
 * `<ion-icon>` is a custom element defined by the Ionicons runtime, so React
 * needs to be told it exists. React 19 keeps the JSX namespace on the `react`
 * module, hence the augmentation below.
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": HTMLAttributes<HTMLElement> & {
        name?: string;
        src?: string;
        size?: "small" | "large";
        /** Flips the glyph in right-to-left locales. */
        "flip-rtl"?: boolean;
      };
    }
  }
}

export {};
