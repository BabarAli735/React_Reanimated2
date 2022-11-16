import { StyleSheet, Text, View } from 'react-native'
import React, {  } from 'react'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { measure, useAnimatedGestureHandler, useAnimatedRef, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export default function Ripple({style,children,onTap}) {
    const centerX=useSharedValue(0)
    const centerY=useSharedValue(0)
    const scale=useSharedValue(0)
    const width=useSharedValue(0)
    const height=useSharedValue(0)
    const rippleOpacity=useSharedValue(1)
    const aRef=useAnimatedRef();
    const panGestureHandler=useAnimatedGestureHandler({
        onActive:()=>{
            if(onTap){
                onTap()
            }
        },
        onStart:(tapEvent)=>{
            const layout=measure(aRef)
            width.value=layout.width
            height.value=layout.height
            centerX.value=tapEvent.x
            centerY.value=tapEvent.y
            rippleOpacity.value=1
            scale.value=0
            scale.value=withTiming(1,{duration:1000})
        },
        onFinish:()=>{
            rippleOpacity.value=withTiming(0)
        }
    })
    const rStyle=useAnimatedStyle(()=>{
       
        const circleRadius=Math.sqrt(width.value**2+height.value**2)
        const translateX=centerX.value-circleRadius
        const translateY=centerY.value-circleRadius
        return{
height:circleRadius*2,
width:circleRadius*2,
borderRadius:circleRadius,
backgroundColor:'rgba(0,0,0,0.3)',
position:'absolute',
opacity:rippleOpacity.value,
top:0,
left:0,
alignSelf:'center',
transform:[{translateX},{translateY},{scale:scale.value}]
        }
    })
  return (
    <View ref={aRef} collapsable={false} style={style}>
    <GestureHandlerRootView >
   <TapGestureHandler onGestureEvent={panGestureHandler}>
    <Animated.View style={[style,{overflow:'hidden'}]}>
        <View >{children}</View>
      <Animated.View style={rStyle}/>
      </Animated.View>
      </TapGestureHandler>
    </GestureHandlerRootView>
    </View>
  )
}

const styles = StyleSheet.create({})