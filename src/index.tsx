import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import './index.css';

const Index: () => JSX.Element = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

AppRegistry.registerComponent('Index', () => Index);
AppRegistry.runApplication('Index', {
  rootTag: document.getElementById('root')
});
