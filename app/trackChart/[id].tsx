import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const TrackChart = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Track Chart Detail for {id}</Text>
    </View>
  );
};

export default TrackChart;
