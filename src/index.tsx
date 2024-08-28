import * as React from 'react';
import { AppRegistry, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import App from './App';
import './index.css';

const Index: () => JSX.Element = () => {
  return (
    <React.StrictMode>
      <App body={styles.body} p={styles.p} code={styles.code} />
    </React.StrictMode>
  )
}

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});

const styles = StyleSheet.create<{
  body: ViewStyle,
  code: TextStyle,
  p: TextStyle
}>({
  body: {
    margin: 0
  },
  code: {
    fontFamily: "monospace"
  },
  p: {
    color: "white"
  }
})
