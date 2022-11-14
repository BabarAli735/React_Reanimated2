import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'

export default function DoubleTabAnimation() {
  const doubleTabref=useRef()
  const scale=useSharedValue(0)
  const opacity=useSharedValue(0)
  const rImageStyle=useAnimatedStyle(()=>{
    return{
transform:[
{scale:Math.max(scale.value,0)},

]
    }
})
  const rImageStyle1=useAnimatedStyle(()=>{
    return{
opacity:opacity.value


    }
})
const onDoubleTapPressed=useCallback(()=>{
scale.value=withSpring(1,undefined,(isFinished)=>{
  if(isFinished){
    scale.value=withDelay(500,withSpring(0))
  }
})
},[])
const onSingleTapPressed=useCallback(()=>{
opacity.value=withSpring(1,undefined,(isFinished)=>{
  if(isFinished){
    opacity.value=withDelay(500,withSpring(0))
  }
})
},[])
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
<GestureHandlerRootView>
  <TapGestureHandler 
  waitFor={doubleTabref}
  onActivated={onSingleTapPressed}>
<TapGestureHandler
maxDelayMs={250}
ref={doubleTabref}
numberOfTaps={2}
onActivated={onDoubleTapPressed}
>
  <Animated.View>
<ImageBackground style={styles.image} source={{ 
    uri:'https://image.shutterstock.com/image-vector/double-gestures-hand-tab-abstract-260nw-1473148805.jpg'}}>
      <Animated.Image style={[{height:100,width:100},rImageStyle]} 
      resizeMode='center'
      source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ45OGn-KR1P4S5X8c_4YB5GRgMiwINr_ELCg&usqp=CAU'}}/>
    </ImageBackground>
    <Animated.Text style={[{fontSize:30,alignSelf:'center'},rImageStyle1]}>☠️😃</Animated.Text>
    </Animated.View>
    </TapGestureHandler>
    </TapGestureHandler>
    </GestureHandlerRootView>
    </View>
  )
}
const {width,height}=Dimensions.get('window')
const styles = StyleSheet.create({
    image:{
        height: height/2,
        width:width,
        alignItems: 'center',
        justifyContent: 'center',
      },
       
})