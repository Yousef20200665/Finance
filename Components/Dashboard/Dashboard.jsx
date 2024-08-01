import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, List, Divider, Button } from 'react-native-paper';
import { Circle as ProgressCircle } from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useFocusEffect } from '@react-navigation/native';

const Dashboard = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8080/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Intro' }],
        })
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  if (!user) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  const moneyPercentage = user.balance / 20000; // Assuming maxMoney is 20000

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Card style={styles.card}>
        <Card.Title title={`User ID: ${user.id}`} />
        <Card.Title title={user.fullName} subtitle={`Email: ${user.email}`} />
        <Card.Content>
          <View style={styles.progressContainer}>
            <ProgressCircle
              size={200}
              progress={moneyPercentage}
              thickness={10}
              showsText={true}
              formatText={() => `$${user.balance}`}
              color="#3498db"
              unfilledColor="#e0e0e0"
              borderWidth={0}
            />
          </View>
          <Text style={styles.infoText}>Max Money: $20000</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="User Information" />
        <Card.Content>
          <List.Item
            title="Email"
            description={user.email}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Divider />
          <List.Item
            title="Username"
            description={user.username}
            left={props => <List.Icon {...props} icon="account" />}
          />
          <Divider />
          <List.Item
            title="Created At"
            description={new Date(user.createdAt).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar" />}
          />
          <Divider />
          <List.Item
            title="Last Updated"
            description={new Date(user.updatedAt).toLocaleDateString()}
            left={props => <List.Icon {...props} icon="calendar-edit" />}
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
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
        color="#f00"
      >
        Logout
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
