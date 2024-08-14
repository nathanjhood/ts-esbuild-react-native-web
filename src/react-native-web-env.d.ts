// /// <reference types="esbuild" />
// /// <reference types="react-native-web" />
// /// <reference types="react-dom" />

import 'react-native-web'
import 'react-dom'
import 'react'

// Add this to '.gitignore'


/**
 *
 */


declare module 'react-native' {
    export {default} from 'react-native-web'
}
