/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */




import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import Home from './src/screens/home';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigator';
import RootNavigator from './src/navigator';

const App = () => {
  return (
    <Provider store={store}>
      
        <RootNavigator/>
      
    </Provider>
  );
};

export default App;



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import AppNavigator from './src/navigator/AppNavigator';
// import store from './src/redux/store';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }

