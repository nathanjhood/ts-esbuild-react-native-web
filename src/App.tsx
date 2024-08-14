import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Image,
  Animated,
  Easing
} from 'react-native';
// import * as css from './App.css';
// import logo from './logo192.png'
export const App = () => {

  const {height} = useWindowDimensions();

  // return (
  //   <View style={[styles.app, { height }, StyleSheet.absoluteFill]}>
  //     <header></header>
  //     <Text>Edit <code>src/App.tsx</code> and save to reload.</Text>
  //   </View>
  // )


  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.timing(
      spinValue,
    {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: false // true  // To make use of native driver for performance
    }
  ).start()

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={[styles.app, { height }, StyleSheet.absoluteFill]}>
      <header style={styles.appHeader}>
        {/* <Image width={192} height={192} id="appLogo" source={logo} alt="logo" /> */}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://github.com/nathanjhood/ts-esbuild-react"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by esbuild with Typescript
        </a>
      </header>
    </View>
  )

}

export default App



const styles = StyleSheet.create({
  app: {
    textAlign: 'center'
  },
  appHeader: {
    color: 'white',
    backgroundColor: '#282c34',

    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px + 2vmin'
  },
  appLogo: {
    height: '40vmin',
    pointerEvents: 'none'
  },

})

// export default function App() {
//   const {height} = useWindowDimensions();
//   const [number, setNumber] = useState(0);

//   function handlePress() {
//     setNumber(parseInt((Math.random() * 10000).toString(), 10) % 100);
//   }

//   return (
//     <View style={[styles.container, {height}, StyleSheet.absoluteFill]}>
//       <Text>Random Number: {number}</Text>
//       <View style={styles.br} />
//       <Pressable
//         style={({pressed}) => [
//           {
//             opacity: pressed ? 0.7 : 1,
//           },
//           styles.btn,
//         ]}
//         onPress={handlePress}>
//         <Text style={styles.btnText}>Generate a number</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   br: {
//     height: 12,
//   },
//   btn: {
//     backgroundColor: '#222',
//     padding: 10,
//   },
//   btnText: {
//     color: '#fff',
//   },
// });
