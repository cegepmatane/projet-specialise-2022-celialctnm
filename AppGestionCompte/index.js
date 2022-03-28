import { registerRootComponent } from 'expo';

import App from './App';
import {View} from "react-native";
import Accueil from "./Components/Accueil";
import Add from "./Components/Add";
import Modifier from "./Components/Modifier";
import Appareil from "./Components/Appareil";
import Depenses from "./Components/Depenses";
import {Text} from "react-native-svg";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
