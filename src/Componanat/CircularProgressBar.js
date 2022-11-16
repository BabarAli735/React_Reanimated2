import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useDebugValue, useEffect } from 'react'
import Svg, { Circle } from 'react-native-svg'
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'

const BACKGROUND_COLOR='#444B6F'
const BACKGROUND_STROCK_COLOR='#303858'
const STROCK_COLOR='#A6E1FA'
const {width,height} =Dimensions.get('window')
export default function CircularProgressBar() {
  const AnimatedCircle=Animated.createAnimatedComponent(Circle)
  const CIRCULAR_LENGTH=1000 //2PI*R
  const R=CIRCULAR_LENGTH/(2*Math.PI) 
  const progress=useSharedValue(0)
 
const onPress=useCallback(()=>{
  progress.value=withTiming(progress.value>0?0: 1,{duration:2000})
},[])
const animatedProps=useAnimatedProps(()=>({
  strokeDashoffset:CIRCULAR_LENGTH*(1-progress.value) //use to complete progress strock width
  // strokeDashoffset:CIRCULAR_LENGTH*progress.value //use to make strock width and progress Strock
}))
  
const progressText=useDerivedValue(()=>{
  return `${Math.floor(progress.value*100)}`
})
  return (
    <View style={styles.container}>
<ReText style={styles.progressText} text={progressText}/>
<Svg style={{position:'absolute'}}>
  <AnimatedCircle cx={width/2} cy={height/2} r={R} 
  stroke={BACKGROUND_STROCK_COLOR}
  strokeWidth={30}
  />
  <AnimatedCircle cx={width/2} cy={height/2} r={R} 
  stroke={STROCK_COLOR}
  strokeWidth={15}
  strokeDasharray={CIRCULAR_LENGTH}
  strokeLinecap='round'
  // strokeDashoffset={CIRCULAR_LENGTH*0.5}
  animatedProps={animatedProps}
  />
</Svg>
<TouchableOpacity style={styles.button}
onPress={onPress}
>
  <Text style={styles.buttonText}>Run</Text>
</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:BACKGROUND_COLOR,
    alignItems:'center',
    justifyContent:'center',

  },
  progressText:{
    color:'rgba(256,256,256,0.7)',
    fontSize:80
  },
  button:{
    position:'absolute',
    bottom:80,
    width:width*0.7,
    height:60,
    backgroundColor:BACKGROUND_STROCK_COLOR,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
fontSize:20,
color:STROCK_COLOR,
letterSpacing:2.1
  }
})