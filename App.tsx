
import {
  Pressable,
  StyleSheet,  Text,  View,
} from 'react-native';
import Login from './Components/Login';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import MoviesList from './Components/Movies';
import MapScreen from './Components/MapScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

enableScreens();

function App(): React.JSX.Element {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem('username');
        const savedPassword = await AsyncStorage.getItem('password');
        if(savedPassword && savedUsername) setLoggedIn(true);
      } catch (error) {
        console.log('Failed to load credentials', error);
      }
    }
    loadCredentials();
  },[])


  const Stack = createStackNavigator();

  const CustomHeader = () => {
    
    return <Pressable style={({ pressed }) => [
      styles.textContainer,
      pressed && styles.pressed,
    ]}
    onPress={async ()=>{
      await AsyncStorage.setItem('username', '');
      await AsyncStorage.setItem('password', '');
      setLoggedIn(false)
    }}>
      <Text style={styles.textStyle}>{'Logout'}</Text>
    </Pressable>
  }
  



  function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            // headerShown:false,
            headerStyle: { backgroundColor: "#BAB8B6" },
            headerTintColor: "black",
            contentStyle: { backgroundColor: "#BAB8B6" },
            headerRight: () => <CustomHeader/>
          }}
        >
          {!loggedIn && <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />}
          <Stack.Screen options={{
            headerLeft:()=> null
          }} name="MapScreen" component={MapScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <Navigation/>
      </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textContainer:{
    paddingRight:10,
  },
  pressed: {
    opacity: 0.75,
  },
  textStyle:{
    fontSize:14,
    fontWeight:'bold'
  }
});

export default App;
