/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }
}

declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  // experimental: import styles that can be used with 'react-native-web' components, using the 'style' prop
  export const unstable_styles: { readonly [key: string]: object };

  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  // experimental: import styles that can be used with 'react-native-web' components, using the 'style' prop
  export const unstable_styles: { readonly [key: string]: object };

  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  // experimental: import styles that can be used with 'react-native-web' components, using the 'style' prop
  export const unstable_styles: { readonly [key: string]: object };

  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare module "env" {
  const env: NodeJS.ProcessEnv & { readonly [key: string]: string };
  export default env;
}

declare module "react-error-overlay" {
  export function stopReportingRuntimeErrors(): void;
  const m: {
    stopReportingRuntimeErrors(): void;
  };
  export default m;
}
