import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useCallback } from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import AntiDesighn from 'react-native-vector-icons/AntDesign'
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const THERSHOLD = SCREEN_WIDTH / 3;
export default function Respective_Menue_Animation() {
  const translateX = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onStart: (_, context) => {
      context.x = translateX.value;
    },
    onEnd: () => {
      if (translateX.value <= THERSHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 3);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 5],
      Extrapolation.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 2],
      [0, 10],
      Extrapolation.CLAMP,
    );
    return {
      borderRadius,
      transform: [
        {perspective: 100},
        {translateX: translateX.value},
        {rotateY: `${-rotate}deg`},
      ],
    };
  }, []);

  const onPress=useCallback(()=>{
if(translateX.value>0){
    translateX.value=withTiming(0)
}else{
    translateX.value=withTiming(SCREEN_WIDTH/2)
}
  },[])
  return (

        <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[{flex: 1, backgroundColor: 'white',padding:10}, rStyle]}
          >
            <AntiDesighn name='menu-fold' color={'black'} size={30}
            onPress={onPress}
            />
          </Animated.View>
        </PanGestureHandler>
    </View>
        </GestureHandlerRootView> 
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e23',
  },
});
