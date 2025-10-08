import SongDetails from '@/src/components/screen/SongDetails';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const SongDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const newId = Number(id);

  return <SongDetails id={newId} />;
};

export default SongDetailsScreen;
