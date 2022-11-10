import {Dimensions, StyleSheet, Switch, Text, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function ThemAnimation() {
  const Colors = {
    dark: {
      backgroundColor: '#1E1E1E',
      circle: '#252525',
      text: '#f8f8f8',
    },
    light: {
      backgroundColor: '#f8f8f8',
      circle: '#ffff',
      text: '#1E1E1E',
    },
  };
  const SWITCH_TRACK_COLOR = {
    true: 'rgba(256,0,256,0.2)',
    false: 'rgba(0,0,0,0.1)',
  };
  const [them, setThem] = useState('light');
  const progress = useDerivedValue(() => {
    return them === 'light' ?withTiming( 0) : withTiming(1);
  }, [them]);
  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.backgroundColor, Colors.dark.backgroundColor],
    );
    return {
      backgroundColor: backgroundColor,
    };
  });
  const circleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {
      backgroundColor: backgroundColor,
    };
  });
  const rText = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {
    color:backgroundColor
    };
  });

  //   console.log('them==',them,'pregress===',progress);
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        rStyle,
      ]}>
        <Animated.Text style={[styles.txt,rText]}>Them</Animated.Text>
        <Animated.View style={[styles.circle,circleStyle]}>

      <Switch
        value={them === 'dark'}
        onValueChange={toggle => {
          setThem(toggle ? 'dark' : 'light');
        }}
        trackColor={SWITCH_TRACK_COLOR}
        thumbColor="violet"
      />
        </Animated.View>
    </Animated.View>
  );
}
const SIZE=Dimensions.get('window').width*0.7

const styles = StyleSheet.create({
    circle:{
height:SIZE,
width:SIZE,
backgroundColor:'white',
alignItems:'center',
justifyContent:'center',
borderRadius:SIZE/2,
shadowOffset:{
    height:5,
    width:0
},
shadowRadius:2,
shadowOpacity:0.05,
elevation:8,
// shadowColor:'black'
    },
    txt:{
        fontSize:50,
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing:20,
        marginBottom:30
    }
});
