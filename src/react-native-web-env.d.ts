/// <reference types="esbuild" />
/// <reference types="react-native-web" />
/// <reference types="react-dom" />

import 'react-native-web'

// Add this to '.gitignore'


/**
 * 
 */
declare module '*.svg' {
    const content: string;
    export default content;
}

declare module 'react-native' {
    export {default} from 'react-native-web'
}