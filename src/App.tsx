import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  useColorScheme,
  Image,
  Animated,
  Easing,
  type ImageStyle,
  type TextStyle,
  type ViewStyle
} from 'react-native';
// import from './App.css';
import logo from './logo.svg'

export const App: ({ body, code, p }: {
    body: ViewStyle;
    code: TextStyle;
    p: TextStyle;
}) => JSX.Element = ({ body, code, p }) => {

  const { width, height, scale, fontScale } = useWindowDimensions();
  const colorScheme = useColorScheme();

  // return (
  //   <View style={[styles.app, { height }, StyleSheet.absoluteFill]}>
  //     <header></header>
  //     <Text>Edit <code>src/App.tsx</code> and save to reload.</Text>
  //   </View>
  // )


  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: false // true  // To make use of native driver for performance
      }
    )
  ).start()

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={[body, styles.app, { height }, StyleSheet.absoluteFill]}>
      <View style={styles.appHeader}>
        <Animated.Image
          style={{ transform: [{ rotate: spin }] }}
          source={{
            uri: "data:image/svg+xml;base64," + logo,
            width: styles.appLogo.width ? parseInt(styles.appLogo.width.toString()) : 500,
            height: styles.appLogo.height ? parseInt(styles.appLogo.height.toString()) : 500
          }}
        />
        <Text style={p}>
          Edit <Text style={code}>src/App.tsx</Text> and save to reload.
        </Text>
        <a
          className="App-link"
          href="https://github.com/nathanjhood/ts-esbuild-react-native-web"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text style={p}>Powered by esbuild with Typescript</Text>
        </a>
      </View>
    </View>
  )

}

export default App



const styles = StyleSheet.create<{
  app: ViewStyle,
  appHeader: ViewStyle,
  appLogo: ImageStyle
}>({
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
    width: 500,
    height: 500,
    pointerEvents: 'none'
  },

})
