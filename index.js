/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import home from './screen/home';
import Login from './screen/login';
import AppWrapper from './screen/appWrapper';
import Admin from './screen/admin';

AppRegistry.registerComponent(appName, () => AppWrapper);
