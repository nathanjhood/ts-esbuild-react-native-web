/// <reference types="node" />

/**
 * Add this to '.gitignore'
 */

declare module '*.svg' {
    const content: string;
    export default content;
}
