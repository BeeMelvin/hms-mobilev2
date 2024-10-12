import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

import React, { useEffect, useState } from "react";

import { View, Text } from "react-native";

export default function HomeScreen() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const api = axios.create({
      baseURL: "http://196.252.236.180:8000/api", // Replace with your local IP
    });
    api
      .get("list/assign/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

return (
  <View>
    {data.map((item) => (
      <Text key={item.id}>
        id:{item.id} {item.title} {item.description}
      </Text>
    ))}
    <Text>not working currently AXIOS error - try</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
