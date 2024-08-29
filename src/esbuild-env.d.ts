declare module "env" {
  const env: { readonly [key: string]: string };
  export default env;
}

declare module "*.txt" {
  const src: string;
  export default src;
}
