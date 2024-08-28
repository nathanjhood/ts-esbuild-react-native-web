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

export const App: (props: React.PropsWithChildren) => JSX.Element = (props) => {

  const { width, height, scale, fontScale } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const spinValue = new Animated.Value(0);

  const spinTiming = Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 20000, // 20 seconds
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: false // true  // To make use of native driver for performance
      }
    )

  // First set up animation
  const animation = Animated.loop(spinTiming)

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <View style={[styles.app, { height: height }, StyleSheet.absoluteFill]}>
      <View style={styles.header}>
        <Animated.Image
          style={[styles.logo, { transform: [{ rotate: spin }] }]}
          source={{ uri: "data:image/svg+xml;base64," + logo }}
          onLoadStart={() => { animation.reset(); return console.info("Loading image..."); }}
          onLoadEnd={() => { animation.start(); return console.info("Loaded image..."); }}
          onError={(error) => { animation.stop(); return console.error(error); }}
        />
        <Text style={styles.p}>
          Edit <Text style={styles.code}>src/App.tsx</Text> and save to reload.
        </Text>
        <Text
          style={styles.link}
          href="https://github.com/nathanjhood/ts-esbuild-react-native-web"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Powered by esbuild with Typescript
        </Text>
      </View>
    </View>
  )

}

export default App;



const styles = StyleSheet.create<{
  app: ViewStyle,
  header: ViewStyle,
  logo: ImageStyle,
  code: TextStyle,
  p: TextStyle,
  link: TextStyle
}>({
  app: {
    textAlign: 'center'
  },
  header: {
    color: 'white',
    backgroundColor: '#282c34',

    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px + 2vmin'
  },
  logo: {
    width: 500,
    height: 500,
    pointerEvents: 'none'
  },
  code: {
    fontFamily: 'monospace, monospace'
  },
  p: {
    color: 'white'
  },
  link: {
    color: "#61dafb"
  }
})
