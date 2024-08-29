import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
import './index.css';

const Index = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

AppRegistry.registerComponent(appName, () => Index);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root')
});
