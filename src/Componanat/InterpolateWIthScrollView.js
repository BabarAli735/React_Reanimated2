import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const {height,width} =Dimensions.get('window')
const SIZE=width*0.6
export default function InterpolateWIthScrollView() {
    const words=["What's Up","Up","Mobile","Dev ?"]
    const translateX=useSharedValue(0)
 
    const scrollHandler=useAnimatedScrollHandler((event)=>{
        translateX.value= event.contentOffset.x
    })
    const Page=({title,index})=>{
        const inputRange= [(index-1)*width,index*width,(index+1)*width]
        const rstyle=useAnimatedStyle(()=>{
            const scale=interpolate(translateX.value,
                inputRange
                ,[0,1,0],
            Extrapolate.CLAMP
            )
            const borderRadius=interpolate(translateX.value,
                inputRange
                ,[0,SIZE/2,0],
            Extrapolate.CLAMP
            )
            return{
                transform:[{scale}],
                borderRadius:borderRadius
            }
        })

        const rTextStyle=useAnimatedStyle(()=>{
            const translationY=interpolate(translateX.value,inputRange,
                [height/2,0,-height/2])
                const opacity=interpolate(translateX.value,inputRange,[-2,1,-2],Extrapolate.CLAMP)
            return{
                opacity:opacity,
                transform:[{translateY:translationY}]
            }
        })
        return(
            <View style={{height,width,backgroundColor:`rgba(0,0,256,0.${index+2})`,alignItems:'center',
            justifyContent:'center'}}>
<Animated.View style={[styles.squre,rstyle]}/>
<Animated.View style={[{position:'absolute'},rTextStyle]}>
    <Text style={styles.txt}>{title}</Text>
</Animated.View>
            </View>
        )
    }
  return (
    <Animated.ScrollView style={styles.container}
    horizontal
    pagingEnabled
    onScroll={scrollHandler}
    scrollEventThrottle={16}
    >
        {words.map((title,index)=>{
            return(
              <Page key={index} index={index} title={title}/>
            )
        })}
      </Animated.ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    squre:{
height:SIZE,
width:SIZE,
backgroundColor:'rgba(0,0,256,0.4)',

    },
    txt:{
        color:'white',
        fontSize:50,
        textTransform:'capitalize',
        fontWeight:'bold'
    }
})