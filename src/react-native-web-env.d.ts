/// <reference types="esbuild" />
/// <reference types="react-native-web" />
/// <reference types="react-dom" />

// Add this to '.gitignore'


/**
 * 
 */
declare module '*.svg' {
    const content: string;
    export default content;
}