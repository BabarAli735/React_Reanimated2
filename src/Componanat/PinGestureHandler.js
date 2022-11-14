import { StyleSheet, Text, View,Image, Dimensions } from 'react-native'
import React from 'react'
import {GestureHandlerRootView, PinchGestureHandler} from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
export default function PinGestureHandler() {
  const {width,height}=Dimensions.get('window')
    const scale=useSharedValue(1)
    const focalX=useSharedValue(0)
    const focalY=useSharedValue(0)
    const AnimateImage=Animated.createAnimatedComponent(Image)
    const pinchHandler=useAnimatedGestureHandler({
        onActive:(event)=>{
scale.value=event.scale
focalX.value=event.focalX
focalY.value=event.focalY

        },
        onEnd:()=>{
          scale.value=withTiming(1)
        }
    })
    const rStyle=useAnimatedStyle(()=>{
        return{
transform:[
  {translateX:focalX.value},
  {translateY:focalY.value},
  {translateX:-width/2},
  {translateY:-height/2},
  {scale:scale.value},
  {translateX:-focalX.value},
  {translateY:-focalY.value},
  {translateX:width/2},
  {translateY:height/2},
]
        }
    })
    const rFocalPointStyle=useAnimatedStyle(()=>{
        return{
transform:[
  {translateX:focalX.value},
  {translateY:focalY.value},
]
        }
    })
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{flex:1}}>
      <AnimateImage source={{uri:'https://post.healthline.com/wp-content/uploads/2019/11/pouring-hot-tea-732x549-thumbnail.jpg'}}
       style={[{flex:1},rStyle]}/>
       <Animated.View style={[styles.focalPoint,rFocalPointStyle]}/>
       </Animated.View>
    </PinchGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  focalPoint:{
    ...StyleSheet.absoluteFillObject,
    width:20,
    height:20,
    borderRadius:10,
    backgroundColor:'red'
  }
})