import * as React from "react";
import { Text, StyleSheet, type TextStyle } from "react-native";

export const Link = (props: {
    children?: React.ReactNode | undefined;
    style: TextStyle,
    href: string
}) => {
  return <Text {...props} role="link" style={[styles.link, props.style]} />;
}

export default Link;

const styles = StyleSheet.create<{
  link: TextStyle
}>({
  link: {
    color: "#1B95E0"
  }
});
