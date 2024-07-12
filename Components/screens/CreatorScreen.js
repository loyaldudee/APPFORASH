import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, TextInput } from 'react-native';

const CreatorScreen = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [organisationData, setOrganisationData] = useState(null);

  const fetchOrganisationData = async () => {
    setLoading(true);
    setMessage('');
    setOrganisationData(null);

    try {
      const response = await fetch(`http://192.168.24.254:3000/organisation/organisation/nepal`);

      if (response.status === 200) {
        const data = await response.json();
        console.log('Fetched organisation data:', data);
        setOrganisationData(data);
        setMessage('Organisation data fetched successfully.');
      } else {
        const errorText = await response.text();
        console.log('Error fetching organisation data:', errorText);
        setMessage(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Error fetching organisation data:', error);
      setMessage('Error fetching organisation data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Creator Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Organisation Name"
        value={organisationName}
        onChangeText={setOrganisationName}
      />
      <Text style = {styles.text}>Name;{organisationName}</Text>
      <Button title="Fetch Organisation Data" onPress={fetchOrganisationData} />
      {loading && <ActivityIndicator size="large" color="#ffffff" />}
      {message ? <Text style={styles.text}>{message}</Text> : null}
      {organisationData && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Organisation Data:</Text>
          <Text style={styles.dataText}>{JSON.stringify(organisationData, null, 2)}</Text>
        </View>
      )}
      <Button title="Back" onPress={onBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    margin: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    color: 'white',
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
  },
  dataText: {
    color: 'white',
  },
});

export default CreatorScreen;
