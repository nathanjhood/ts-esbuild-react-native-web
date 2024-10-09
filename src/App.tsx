import type RN = require("react-native");
import ReactNative = require("react-native");
import logo = require("./logo.svg");

const App = () => {
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
      fontSize: scale * (10 + vmin(2, viewport)),
    },
    link: {
      color: "#61dafb",
      fontSize: scale * (10 + vmin(2, viewport)),
    },
  });

  return (
    <ScrollView
      style={[styles.app, { height: height }, StyleSheet.absoluteFill]}
    >
      <View style={styles.header}>
        <Animated.Image
          style={[
            styles.logo,
            {
              scale: scale,
              width: scale * vmin(40, viewport),
              height: scale * vmin(40, viewport),
            },
            { transform: [{ rotate: spin }] },
          ]}
          width={841.9}
          height={595.3}
          source={{ uri: "data:image/svg+xml;base64," + logo }}
          onLoadStart={() => animation.reset()}
          onLoadEnd={() => animation.start()}
          onError={() => animation.stop()}
        />
        <Text style={styles.p}>
          Edit <Text style={styles.code}>src/App.tsx</Text> and save to reload.
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
