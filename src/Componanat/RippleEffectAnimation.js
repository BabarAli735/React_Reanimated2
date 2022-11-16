import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ripple from './Ripple'

export default function RippleEffectAnimation() {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple}
      onTap={()=>{
        'worklet';
        console.log('Ontap====');
      }}
      >
        <Text style={{fontSize:30}}>Tap</Text>
      </Ripple>
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
    ripple:{
        height:200,
        width:200,
        borderRadius:20,
        backgroundColor:'white',
        elevation:6,
        alignItems:'center',
        justifyContent:'center'
    }
})