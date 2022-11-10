import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
  import {PanGestureHandler,GestureHandlerRootView} from 'react-native-gesture-handler'
  const SIZE=100.0
  const CIRCLERADIUSE=SIZE*2
export default function GestureHandler() {
 
  const translationX=useSharedValue(0)
  const translationY=useSharedValue(0)
  const PanGestureEvent=useAnimatedGestureHandler({
    onStart:(event,context)=>{
      context.translateX=translationX.value
      context.translateY=translationY.value
    },
    onEnd:()=>{
      const distance=Math.sqrt(translationX.value**2+translationY.value**2)
      if(distance<CIRCLERADIUSE+SIZE/2){

        translationX.value=withSpring(0)
        translationY.value=withSpring(0)
      }
    },
    onActive:(event,context)=>{
      translationX.value=event.translationX+context.translateX
      translationY.value=event.translationY+context.translateY
      console.log(event.translationX);
    }
  })
  const rStyle=useAnimatedStyle(()=>{
    return{
      transform:[{translateX:translationX.value},{
        translateY:translationY.value
      }]
    }
  })
  return (
    <GestureHandlerRootView>
      <View style={styles.circle}>
    <PanGestureHandler onGestureEvent={PanGestureEvent}>
      <Animated.View style={[styles.squre,rStyle]}/>
    </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
    squre:{
        height:SIZE,
        width:SIZE,
        backgroundColor:'red'
    },
    circle:{
      height:CIRCLERADIUSE*2,
      width:CIRCLERADIUSE*2,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:CIRCLERADIUSE,
      borderWidth:5,
      borderColor:'red'
    }
})