import type RC = require("react");
import type RN = require("react-native");
import React = require("react");
import ReactNative = require("react-native");
import logo = require("./logo.svg");
import env from "env" with { type: "json" };

const App = () => {
  const { useState, useEffect }: typeof RC = React;
  const {
    Animated,
    Easing,
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions,
  }: typeof RN = ReactNative;

  type ViewPort = Pick<RN.ScaledSize, "width" | "height">;

  const { width, height, scale }: RN.ScaledSize = useWindowDimensions();

  const viewport: ViewPort = {
    width: width,
    height: height,
  };

  const percentageOf = (partialValue: number, totalValue: number): number => {
    return totalValue / (100 / partialValue);
  };

  const lowestOf = (a: number, b: number): number => {
    return a < b ? a : b;
  };

  const vmin: (percentage: number, viewport?: ViewPort) => number = (
    percentage: number,
    viewport: ViewPort = useWindowDimensions() // default, can be overridden
  ): number => {
    return percentageOf(lowestOf(viewport.width, viewport.height), percentage);
  };

  const spinValue: ReactNative.Animated.Value = new Animated.Value(0);

  // Will loop without blocking the UI thread if the child animation is set
  // to 'useNativeDriver'.
  const spinConfig = {
    toValue: 1,
    duration: 20000, // 20 seconds
    easing: Easing.linear,
    useNativeDriver: false,
  };

  const spinTiming = Animated.timing(spinValue, spinConfig);

  const spin = spinValue.interpolate<string | number>({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animation = Animated.loop(spinTiming);

  // https://since1979.dev/respecting-prefers-reduced-motion-with-javascript-and-react/
  const useReducedMotion: (defaultVal?: true | false) => boolean = (
    defaultVal = true
  ) => {
    // Local state to store the reduced motion setting.
    const [reducedMotion, setReducedMotion] = useState<boolean>(defaultVal);

    // Callback for media query change events.
    function queryChangeHandler(event: MediaQueryListEvent | any) {
      // Set the state to the value of the media query.
      setReducedMotion(event.target.matches);
    }

    useEffect(() => {
      // Grab the reduced motion media query,
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

      if (mediaQuery) {
        // Set the state to the value of the media query.
        setReducedMotion(mediaQuery.matches);

        // Listen for changes in the media query.
        mediaQuery.addEventListener("change", queryChangeHandler);

        // Clean up the event listener when the component unmounts.
        return () =>
          mediaQuery.removeEventListener("change", queryChangeHandler);
      }
      return;
    }, []);

    return reducedMotion;
  };

  const fontSize = scale * (10 + vmin(2, viewport));

  // Get the recuded motion state from our hook.
  const isReducedMotion = useReducedMotion(true);

  const imageInlineSizeLimit = parseInt(
    env["IMAGE_INLINE_SIZE_LIMIT"] || "10000"
  );

  const lineHeight = (fontSize: number) => {
    const multiplier = fontSize > 20 ? 1.5 : 1;
    return parseInt((fontSize + fontSize * multiplier).toString(), 10);
  };

  const styles = StyleSheet.create<{
    app: ReactNative.ViewStyle;
    header: ReactNative.ViewStyle;
    logo: ReactNative.ImageStyle;
    code: ReactNative.TextStyle;
    p: ReactNative.TextStyle;
    link: ReactNative.TextStyle;
  }>({
    app: {
      textAlign: "center",
      margin: 0,
    },
    header: {
      color: "white",
      backgroundColor: "#282c34",

      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px + 2vmin",
    },
    logo: {
      pointerEvents: "none",
      width: "40vmin",
      height: "40vmin",
    },
    code: {
      fontFamily: "monospace, monospace",
    },
    p: {
      color: "white",
      fontSize: fontSize,
      textAlign: "center",
      lineHeight: lineHeight(fontSize),
    },
    link: {
      color: "#61dafb",
      fontSize: fontSize,
      textAlign: "center",
      lineHeight: lineHeight(fontSize),
    },
  });

  return (
    <ScrollView
      style={[styles.app, { height: height }, StyleSheet.absoluteFill]}
    >
      <View style={styles.header}>
        <Animated.Image
          alt="logo"
          style={[
            styles.logo,
            {
              // display: "block",
              scale: scale,
              width: scale * vmin(40, viewport),
              height: scale * vmin(40, viewport),
              maxWidth: "100%",
              WebkitFontSmoothing: "antialiased",
              overflowClipMargin: "content-box",
              overflowX: "clip",
              overflowY: "clip",
              // lineHeight: "1.5",
              maxInlineSize: imageInlineSizeLimit,
            },
            { transform: [{ rotate: spin }] },
          ]}
          width={841.9}
          height={595.3}
          source={{ uri: "data:image/svg+xml;base64," + logo }}
          onLoadStart={() => animation.reset()}
          onLoadEnd={() => (isReducedMotion ? null : animation.start())}
          onError={() => animation.stop()}
        />
        <Text
          style={[
            styles.p,
            {
              WebkitFontSmoothing: "antialiased",
              tabSize: 4,
              unicodeBidi: "isolate",
            },
          ]}
        >
          Edit{" "}
          <Text
            style={[
              styles.code,
              {
                WebkitFontSmoothing: "antialiased",
                tabSize: 4,
                unicodeBidi: "isolate",
                // lineHeight: "1.5",
              },
            ]}
          >
            src/App.tsx
          </Text>{" "}
          and save to reload.
        </Text>
        <Text
          style={styles.link}
          href="https://github.com/nathanjhood/esbuild-scripts"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Powered by esbuild with Typescript
        </Text>
      </View>
    </ScrollView>
  );
};

export = App;
