// TransactionsList.js
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, List, Divider, Text } from 'react-native-paper';

const transactions = [
  {
    transactionId: '1',
    transactionType: 'Expense',
    transactionDate: '2021-01-01',
    transactionAmount: '2000',
    transactionDescription: 'Food Delivery',
  },
  {
    transactionId: '6',
    transactionType: 'Income',
    transactionDate: '2021-01-01',
    transactionAmount: '2000',
    transactionDescription: 'Upwork',
  },
];

const TransactionsList = () => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <List.Item
          title={`Amount: $${item.transactionAmount}`}
          description={`Type: ${item.transactionType} - Date: ${item.transactionDate} - Description: ${item.transactionDescription}`}
          left={props => <List.Icon {...props} icon={item.transactionType === 'Income' ? 'cash' : 'cash-minus'} />}
        />
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.transactionId}
        ItemSeparatorComponent={() => <Divider />}
      />
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
  card: {
    marginBottom: 10,
  },
});

export default TransactionsList;
