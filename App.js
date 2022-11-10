
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
<GestureHandler/>
    </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
