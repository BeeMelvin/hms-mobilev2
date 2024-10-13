import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const AssignmentsScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get('http://196.252.236.180:8000/api/list/assign/');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item) => (
          <Text key={item.id}>
            {item.title}: {item.description}
          </Text>
        ))
      ) : (
        <Text>No assignments found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AssignmentsScreen;
