import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SlideCountr from './SlideCountr'

export default function Slide_CounterAnimation() {
  return (
    <View style={styles.container}>
     <SlideCountr/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    counterContainer:{
        height:70,
        width:200,
        backgroundColor:'#111111',
        borderRadius:10
    }
})