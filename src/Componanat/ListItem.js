import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntiDesign from 'react-native-vector-icons/AntDesign';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const TRANSLATE_X_THERESOLD = -width * 0.3;
const LIST_ITEM_HEIGHT = 70;
export default function ListItem({task,onDismiss,simultaneousHandlers}) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const opacity = useSharedValue(1);
  const marginVertical = useSharedValue(10);
  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onStart: () => {},
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THERESOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-width);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0,undefined,(isFinished)=>{
            if(isFinished && onDismiss){
               runOnJS(onDismiss)(task)
            }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THERESOLD ? 1 : 0,
    );
    return {
      opacity,
    };
  });
  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });
  return (
    <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <AntiDesign name="delete" color={'red'} size={30} />
      </Animated.View>
      <GestureHandlerRootView style={styles.taskContainer}>
        <PanGestureHandler onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandlers}
        >
          <Animated.View style={[styles.task, rStyle]}>
            <Text style={styles.taskTitle}>abcd</Text>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  task: {
    width: '90%',
    height: LIST_ITEM_HEIGHT,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    borderRadius: 10,
  },
  taskContainer: {
    width: '100%',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
  },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    // backgroundColor:'red',
    position: 'absolute',
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
});
