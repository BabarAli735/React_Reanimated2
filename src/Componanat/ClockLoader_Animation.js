import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {N, SQUARE_SIZE} from './Constants';
import Squre from './Squre';
import {Easing, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

export default function ClockLoader_Animation() {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value =withRepeat(withTiming(4 * Math.PI, {duration: 4000,easing:Easing.linear}),-1);
  }, []);
  return (
    <View style={styles.container}>
      {new Array(N).fill(0).map((_, index) => {
        return (
          <Squre key={index.toString()} progress={progress} index={index} />
        );
      })}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
