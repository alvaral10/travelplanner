import { AppRegistry } from 'react-native';
import App from '../../com/App';  // Corrected import for App component
import { name as appName } from '../../com/app.json';

AppRegistry.registerComponent(appName, () => App);
