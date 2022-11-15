import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
    cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

export default function ScrollViewUsingPanGesture() {
  const {width: PAGE_WIDTH} = Dimensions.get('window');
  const words = ["What's Up", 'Up', 'Mobile', 'Dev ?'];
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    const MAX_TRANSLATX = -PAGE_WIDTH * (words.length - 1);
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATX);
  });
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX)
    },
    onActive: (event, context) => {
      // console.log(event.translationX);
      translateX.value = event.translationX + context.x;
    },

    onEnd: event => {
      translateX.value = withDecay({velocity: event.velocityX});
    },
  });

  const Page = ({index, title}) => {
    const pageOffset = PAGE_WIDTH * index;
    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: clampedTranslateX.value + pageOffset}],
      };
    });
    return (
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: `rgba(0,0,256,0.${index + 2})`,
            alignItems: 'center',
            justifyContent: 'center',
          },
          rStyle,
        ]}>
        <Text style={{fontSize:70}}>{title}</Text>
      </Animated.View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={{flex: 1, flexDirection: 'row'}}>
            {words.map((title, index) => {
              return (
                <Page index={index} title={title} key={index.toString()} />
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({});
