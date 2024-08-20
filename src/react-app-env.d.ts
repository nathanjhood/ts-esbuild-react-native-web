/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
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
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// declare module "env" {
//   const env: { readonly [key: string]: string } = process.env;
//   export default env;
// }

// declare type ReactEnvironmentNames = "production" | "development" | "test";

// declare type ReactEnvironmentValues = {
//   readonly NODE_ENV: string;
//   readonly PUBLIC_URL: string;
//   readonly PORT: string;
//   readonly HOST: string;
//   readonly HTTPS: string;
// };

// declare type ReactEnvironment = Record<
//   ReactEnvironmentNames,
//   ReactEnvironmentValues
// >;

// declare type ReactEnvironmentConstructor = {
//   new (options?: ReactEnvironment): ReactEnvironment;
//   (options?: ReactEnvironment): ReactEnvironment;
//   readonly protoype: ReactEnvironment;
// };

// // eslint-disable-next-line no-var
// declare var ReactEnvironment: ReactEnvironmentConstructor;

// /**
//  *
//  */

// declare module 'react-native' {
//     export {default} from 'react-native-web'
// }
