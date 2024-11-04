import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Individual from '../screens/individual';
import Favorites from '../screens/favorites';
import Cart from '../screens/cart';
import Splash from '../screens/splashScreen';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash">

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Product" component={Individual} />
        <Stack.Screen name="Wishlist" component={Favorites} />
        <Stack.Screen name="Cart" component={Cart} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
