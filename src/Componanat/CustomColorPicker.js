import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const colors = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];
const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
const {width, height} = Dimensions.get('window');
const PICKER_WIDTH = width * 0.9;
export default function CustomColorPicker() {
  const pickedColor=useSharedValue(colors[0])

  const rMainCircleStyle=useAnimatedStyle(()=>{
    return{
      backgroundColor:pickedColor.value
    }
  })
  const onChangColor=useCallback((color)=>{
    'worklet'
    pickedColor.value=color
  },[])


  const ColorPicker = ({onChangeColorPicke}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const adjustTranslationX = useDerivedValue(() => {
      return Math.min(
        Math.max(translateX.value, 0),
        PICKER_WIDTH - CIRCULAR_SIZE,
      ); // use to ajust Starting point
    });
    const panGestureEvent = useAnimatedGestureHandler({
      onActive: (event, context) => {
        translateX.value = event.translationX + context.x;
      },
      onStart: (_, context) => {
        context.x = adjustTranslationX.value;
        translateY.value = withSpring(-CIRCULAR_SIZE);
        scale.value = withSpring(1.2);
      },
      onEnd: () => {
        translateY.value = withSpring(0);
        scale.value = withSpring(1);
      },
    });

    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: adjustTranslationX.value},
          {translateY: translateY.value},
          {scale: scale.value},
        ],
      };
    });
    const rInternalPickerStyle = useAnimatedStyle(() => {
      const inputRange=colors.map((_,index)=>(index/colors.length*PICKER_WIDTH))

      const backgroundColor = interpolateColor(
        translateX.value,
        // [
        //   (1 / 9) * PICKER_WIDTH,
        //   (2 / 9) * PICKER_WIDTH,
        //   (3 / 9) * PICKER_WIDTH,
        //   (4 / 9) * PICKER_WIDTH,
        //   (5 / 9) * PICKER_WIDTH,
        //   (6 / 9) * PICKER_WIDTH,
        //   (7 / 9) * PICKER_WIDTH,
        //   (8 / 9) * PICKER_WIDTH,
        //   (9 / 9) * PICKER_WIDTH,
        // ],
        // [
        //   'red',
        //   'purple',
        //   'blue',
        //   'cyan',
        //   'green',
        //   'yellow',
        //   'orange',
        //   'black',
        //   'white',
        // ],
        inputRange,
        colors
      );
      // console.log(backgroundColor);
      onChangeColorPicke(backgroundColor)
      return {
        backgroundColor:backgroundColor,
      };
    });

    const tapGestureHandle=useAnimatedGestureHandler({
onStart:(event)=>{
  translateY.value = withSpring(-CIRCULAR_SIZE);
  scale.value = withSpring(1.2);
translateX.value=withTiming(event.absoluteX-CIRCULAR_SIZE)
},
onActive:()=>{},
onEnd:()=>{
  translateY.value = withSpring(0);
  scale.value = withSpring(1);
}
    })
    return (
   
      <GestureHandlerRootView>
           <TapGestureHandler onGestureEvent={tapGestureHandle}>
            <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View>
            <LinearGradient
              style={styles.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={colors}
            />
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View
                style={[styles.internalPicker, rInternalPickerStyle]}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        </Animated.View>
        </TapGestureHandler>
      </GestureHandlerRootView>
    );
  };
  return (
    <>
      <View style={styles.topCOntainer}>
        <Animated.View style={[styles.circle,rMainCircleStyle]}/>
      </View>
      <View style={styles.bottomCOntainer}>
        <ColorPicker 
        onChangeColorPicke={onChangColor}
        />
      </View>
    </>
  );
}
const CIRCULAR_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCULAR_SIZE / 2;
const styles = StyleSheet.create({
  topCOntainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems:'center',
    justifyContent:'center'
  },
  bottomCOntainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    height: 50,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  picker: {
    height: CIRCULAR_SIZE,
    width: CIRCULAR_SIZE,
    borderRadius: CIRCULAR_SIZE,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalPicker: {
    height: INTERNAL_PICKER_SIZE,
    width: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE,
    borderWidth: 1.0,
    borderColor: 'rgba(0,0,0,0.2)',
    // position: 'absolute',
  },
  circle:{
    width:width*0.7,
    height:width*0.7,
    borderRadius:width*0.7,
   
  }
});
