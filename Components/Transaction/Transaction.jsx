// Transaction.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [email, setemail] = useState('');

  const handleTransaction = () => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Transaction</Text>
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="user email"
        value={email}
        onChangeText={setemail}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleTransaction} style={styles.button}>
        Submit
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
