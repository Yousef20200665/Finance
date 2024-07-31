// Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Divider, Button } from 'react-native-paper';
import { Circle as ProgressCircle } from 'react-native-progress';

const Dashboard = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/Dashboard');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const moneyPercentage = user.money / user.maxMoney;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Card style={styles.card}>
        <Card.Title title={user.name} subtitle={`${user.age} years old, ${user.gender}`} />
        <Card.Content>
          <View style={styles.progressContainer}>
            <ProgressCircle
              size={200}
              progress={moneyPercentage}
              thickness={10}
              showsText={true}
              formatText={() => `$${user.money}`}
              color="#3498db"
              unfilledColor="#e0e0e0"
              borderWidth={0}
            />
          </View>
          <Text style={styles.infoText}>Max Money: ${user.maxMoney}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="User Information" />
        <Card.Content>
          <List.Item
            title="Visa Type"
            description={user.visaType}
            left={props => <List.Icon {...props} icon="credit-card" />}
          />
          <Divider />
          <List.Item
            title="Address"
            description={user.address}
            left={props => <List.Icon {...props} icon="home" />}
          />
          <Divider />
          <List.Item
            title="City"
            description={user.city}
            left={props => <List.Icon {...props} icon="city" />}
          />
          <Divider />
          <List.Item
            title="Country"
            description={user.country}
            left={props => <List.Icon {...props} icon="flag" />}
          />
          <Divider />
          <List.Item
            title="Last Transaction"
            description={user.lastTransaction}
            left={props => <List.Icon {...props} icon="history" />}
          />
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Transaction')}
        style={styles.button}
      >
        Make a Transaction
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TransactionsList')}
        style={styles.button}
      >
        View Transactions
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    marginBottom: 20,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default Dashboard;
