import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import AntiDesighn from 'react-native-vector-icons/AntDesign';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const clamp = (value, min, max) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};




const BUTTON_WIDTH = 180;
const MAX_SIDE_OFFSET = BUTTON_WIDTH * 0.3;
export default function SlideCountr() {
  const ICON_SIZE = 20;
  const onPress = useCallback(() => {}, []);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [count, setCount] = useState(0);
  // wrapper funtion
  const increament = useCallback(() => {
    // external library funtion
  setCount(count => count + 1);
}, []);
  const decreament = useCallback(() => {
    // external library funtion
  setCount(count => count - 1);
}, []);
  const reset = useCallback(() => {
    // external library funtion
  setCount(0);
}, []);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = clamp(
        event.translationX,
        -MAX_SIDE_OFFSET,
        MAX_SIDE_OFFSET,
      );
      translateY.value = clamp(event.translationY, 0, MAX_SIDE_OFFSET);
    },
    onStart: () => {},
    onEnd: () => {
      if (translateX.value === MAX_SIDE_OFFSET) {
        // Increament
        runOnJS(increament)()
      } else if (translateX.value === -MAX_SIDE_OFFSET) {
        // decreament
        runOnJS(decreament)()
      }
      else if(translateY.value===MAX_SIDE_OFFSET){
        runOnJS(reset)()
      }
      translateX.value = withSpring(0, {stiffness: 200});
      translateY.value = withSpring(0);
    },
  });

  const rCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  const rPlusMinusStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SIDE_OFFSET, 0, MAX_SIDE_OFFSET],
      [0.4, 0.8, 0.4],
    );
    const opacitY = interpolate(translateY.value, [0, MAX_SIDE_OFFSET], [1, 0]);
    return {
      opacity: opacityX * opacitY,
    };
  }, []);
  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SIDE_OFFSET],
      [0, 0.4],
    );
    return {
      opacity: opacity,
    };
  }, []);
  const rButtonStyle = useAnimatedStyle(() => {
    
    return {
      transform:[{translateX:translateX.value*0.1},{
        translateY:translateY.value*0.1
      }],
    };
  }, []);

  return (
    <Animated.View style={[styles.counterContainer,rButtonStyle]}>
      <Animated.View style={rPlusMinusStyle}>
        <AntiDesighn
          name="minus"
          color={'white'}
          size={ICON_SIZE}
          onPress={onPress}
        />
      </Animated.View>
      <Animated.View style={rCloseIconStyle}>
        <AntiDesighn
          name="close"
          color={'white'}
          size={ICON_SIZE}
          onPress={onPress}
        />
      </Animated.View>
      <Animated.View style={rPlusMinusStyle}>
        <AntiDesighn
          name="plus"
          color={'white'}
          size={ICON_SIZE}
          onPress={onPress}
        />
      </Animated.View>
      <GestureHandlerRootView
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.circle, rCircleStyle]}>
            <Text style={styles.txt}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    height: 70,
    width: BUTTON_WIDTH,
    backgroundColor: '#111111',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'white',
  },
});
