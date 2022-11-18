import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { N, SQUARE_SIZE } from './Constants'
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

export default function Squre({index,progress}) {
    // console.log(progress);
    const offsetAngle=(2*Math.PI)/N
    const finalAngle=offsetAngle*(N-1-index)
  
  const rotate=useDerivedValue(()=>{
    if(progress.value<=2*Math.PI){
    return Math.min(finalAngle,progress.value)
    }
    if(progress.value-2*Math.PI<finalAngle){
      return finalAngle
    }
    return progress.value
  })

  const translateY=useDerivedValue(()=>{
    if(rotate.value===finalAngle){
      return withSpring(-N*SQUARE_SIZE)
    }
    if(progress.value>2*Math.PI){
      return (index-N)*SQUARE_SIZE
    }
    return withTiming(-index*SQUARE_SIZE)
  })
    const rStyle=useAnimatedStyle(()=>{
        return{
            transform:[{
                rotate:`${rotate.value}rad`
            },{translateY:translateY.value}]
        }
    })
  return (
    <Animated.View  style={[{
        height:SQUARE_SIZE,
        aspectRatio:1,
        backgroundColor:'white',
        // opacity:(index+1)/N,
        position:'absolute',
        
    },rStyle]}/>
  )
}

const styles = StyleSheet.create({})