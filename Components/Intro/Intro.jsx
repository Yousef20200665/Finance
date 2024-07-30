// Intro.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Finance App</Text>
      <Button 
        mode="contained" 
        style={styles.button} 
        onPress={() => navigation.navigate('Register')}
      >
        Register
      </Button>
      <Button 
        mode="outlined" 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});

export default Intro;
