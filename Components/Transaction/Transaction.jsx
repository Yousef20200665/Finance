import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Transaction = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleTransaction = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const transactionDate = new Date().toISOString().split('T')[0]; 
  
      if (!userId || !amount || !description) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }

      console.log("Before fetch call");
  
      const response = await fetch(`http://127.0.0.1:8080/transactions/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          transactionType: 'Expense',
          transactionDate,
          transactionAmount: amount,
          transactionDescription: description,
        }),
      });
      
      console.log("After fetch call");

      

      console.log("Response status:", response.status);
     
      if (response.status === 200) {
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Error', data.message || 'Failed to complete transaction');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      Alert.alert('Error', 'Failed to complete transaction');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Transaction</Text>
      <TextInput
        label="User ID"
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleTransaction} style={styles.button}>
        Submit Transaction
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
});

export default Transaction;
