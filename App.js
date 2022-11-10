
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
import ThemAnimation from './src/Componanat/ThemAnimation';

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
<ThemAnimation/>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
