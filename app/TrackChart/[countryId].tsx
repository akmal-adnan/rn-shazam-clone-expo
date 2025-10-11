import SubCharts from '@/src/components/screen/SubCharts';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const TrackChart = () => {
  const { countryId, country } = useLocalSearchParams<{
    countryId: string;
    country: string;
  }>();

  return <SubCharts countryId={countryId} country={country} />;
};

export default TrackChart;
