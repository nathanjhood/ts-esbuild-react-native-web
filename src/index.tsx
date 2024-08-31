import * as React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from '../app.json';
import './index.css';
import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers:
// https://create-react-app.dev/docs/making-a-progressive-web-app
serviceWorker.unregister();
