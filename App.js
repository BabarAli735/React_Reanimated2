
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import GestureHandler from './src/Componanat/GestureHandler';
import InterpolateWIthScrollView from './src/Componanat/InterpolateWIthScrollView';

const App = () => {
 
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar barStyle={'default'} />
<InterpolateWIthScrollView/>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
