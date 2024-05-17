// import { View } from 'react-native'

// function Login() {
//   return (
//     <View>

//     </View>
//   )
// }

// export default Login

import {useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {usernameActions} from '../store/username';
import CustomButton from './CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
  const name = useSelector(state => state.user.username);
  const pass = useSelector(state => state.user.password);
  console.log('v', name, pass);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function usernameHandler(enteredInput) {
    setUsername(enteredInput);
  }

  function passwordHandler(enteredInput) {
    setPassword(enteredInput);
  }

  const submitHandler = async () => {
    if (isNaN(username)) {
      return Alert.alert(
        'Invalid Username',
        "Username should be a 'digit' less than 10",
      );
    }
    if (username.trim().length < 10) {
      return Alert.alert(
        'Invalid Username',
        'Entered less than 10 digits number',
      );
    }
    if (password.trim().length < 6) {
      return Alert.alert('Invalid Password', 'Password should be more than 6');
    }
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
    } catch (error) {
      console.log('Failed to save credentials', error);
    }
    // setUsername('');
    // setPassword('');
    navigation.navigate('MapScreen');
    dispatch(usernameActions.username(username, password));
  };
  return (
    <ImageBackground
      source={require('./assets/googlemaps.jpg')}
      style={styles.background}>
      <View style={styles.rootContainer}>
        <Text style={styles.textLabel}>Username</Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          onChangeText={usernameHandler}
          value={username}
          maxLength={10}
          placeholder="Enter 10 digits as a username"
          placeholderTextColor="white"
        />
        <Text style={styles.textLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={passwordHandler}
          value={password}
          placeholder="Enter password less than 6"
          placeholderTextColor="white"
          secureTextEntry={true}
          autoCorrect={false}
        />
        <CustomButton onPress={submitHandler}>Login</CustomButton>
      </View>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 16.5,
    justifyContent: 'center',
    // marginBottom: 50,
    // marginHorizontal: 20,
  },
  textLabel: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: '#5084A0',
  },
  textInput: {
    backgroundColor: 'grey',
    marginBottom: 8,
    borderRadius: 6,
    padding: 10,
    color: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
