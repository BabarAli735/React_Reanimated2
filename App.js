
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
import CircularProgressBar from './src/Componanat/CircularProgressBar';
import CustomColorPicker from './src/Componanat/CustomColorPicker';
import CustomSwipeToDelete from './src/Componanat/CustomSwipeToDelete';
import DoubleTabAnimation from './src/Componanat/DoubleTabAnimation';
import GestureHandler from './src/Componanat/GestureHandler';
import InterpolateWIthScrollView from './src/Componanat/InterpolateWIthScrollView';
import PinGestureHandler from './src/Componanat/PinGestureHandler';
import Respective_Menue_Animation from './src/Componanat/Respective_Menue_Animation';
import RippleEffectAnimation from './src/Componanat/RippleEffectAnimation';
import ScrollViewUsingPanGesture from './src/Componanat/ScrollViewUsingPanGesture';
import ThemAnimation from './src/Componanat/ThemAnimation';

const App = () => {
 
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: 'white',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    //   <StatusBar barStyle={'default'} />
    <View style={{flex:1}}>
<Respective_Menue_Animation/>
</View>
    // </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
