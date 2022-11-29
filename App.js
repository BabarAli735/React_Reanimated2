
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
import AnimatedFlateList from './src/Componanat/AnimatedFlateList';
import CircularProgressBar from './src/Componanat/CircularProgressBar';
import ClockLoader_Animation from './src/Componanat/ClockLoader_Animation';
import CustomColorPicker from './src/Componanat/CustomColorPicker';
import CustomSwipeToDelete from './src/Componanat/CustomSwipeToDelete';
import DoubleTabAnimation from './src/Componanat/DoubleTabAnimation';
import GestureHandler from './src/Componanat/GestureHandler';
import InterpolateWIthScrollView from './src/Componanat/InterpolateWIthScrollView';
import Magic_Layout_Animatiom from './src/Componanat/Magic_Layout_Animatiom';
import PinGestureHandler from './src/Componanat/PinGestureHandler';
import Respective_Menue_Animation from './src/Componanat/Respective_Menue_Animation';
import RippleEffectAnimation from './src/Componanat/RippleEffectAnimation';
import ScrollViewUsingPanGesture from './src/Componanat/ScrollViewUsingPanGesture';
import Slide_CounterAnimation from './src/Componanat/Slide_CounterAnimation';
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
<AnimatedFlateList/>
</View>
    // </View>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
