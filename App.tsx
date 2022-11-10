import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/Tabs.js';
import {Text, Image, useColorScheme, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialIcons';

const queryClient = new QueryClient();

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
