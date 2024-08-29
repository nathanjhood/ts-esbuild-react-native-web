/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from './pages/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;


// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   useWindowDimensions,
//   useColorScheme,
//   Image,
//   Animated,
//   Easing,
//   type ImageStyle,
//   type TextStyle,
//   type ViewStyle
// } from 'react-native';
// // import from './App.css';
// import logo from './logo.svg'

// export const App: (props: React.PropsWithChildren) => JSX.Element = (props) => {

//   const { width, height, scale, fontScale } = useWindowDimensions();
//   const colorScheme = useColorScheme();

//   const spinValue = new Animated.Value(0);

//   const spinTiming = Animated.timing(
//       spinValue,
//       {
//         toValue: 1,
//         duration: 20000, // 20 seconds
//         easing: Easing.linear, // Easing is an additional import from react-native
//         useNativeDriver: false // true  // To make use of native driver for performance
//       }
//     )

//   // First set up animation
//   const animation = Animated.loop(spinTiming)

//   // Next, interpolate beginning and end values (in this case 0 and 1)
//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg']
//   })

//   return (
//     <View style={[styles.app, { height: height }, StyleSheet.absoluteFill]}>
//       <View style={styles.header}>
//         <Animated.Image
//           style={[styles.logo, { transform: [{ rotate: spin }] }]}
//           source={{ uri: "data:image/svg+xml;base64," + logo }}
//           onLoadStart={() => { animation.reset(); return console.info("Loading image..."); }}
//           onLoadEnd={() => { animation.start(); return console.info("Loaded image..."); }}
//           onError={(error) => { animation.stop(); return console.error(error); }}
//         />
//         <Text style={styles.p}>
//           Edit <Text style={styles.code}>src/App.tsx</Text> and save to reload.
//         </Text>
//         <Text
//           style={styles.link}
//           href="https://github.com/nathanjhood/ts-esbuild-react-native-web"
//           // target="_blank"
//           // rel="noopener noreferrer"
//         >
//           Powered by esbuild with Typescript
//         </Text>
//       </View>
//     </View>
//   )

// }

// export default App;



// const styles = StyleSheet.create<{
//   app: ViewStyle,
//   header: ViewStyle,
//   logo: ImageStyle,
//   code: TextStyle,
//   p: TextStyle,
//   link: TextStyle
// }>({
//   app: {
//     textAlign: 'center'
//   },
//   header: {
//     color: 'white',
//     backgroundColor: '#282c34',

//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontSize: '10px + 2vmin'
//   },
//   logo: {
//     width: 500,
//     height: 500,
//     pointerEvents: 'none'
//   },
//   code: {
//     fontFamily: 'monospace, monospace'
//   },
//   p: {
//     color: 'white'
//   },
//   link: {
//     color: "#61dafb"
//   }
// })
