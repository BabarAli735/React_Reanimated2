
 import React, { useEffect } from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 
 import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withRepeat,
   withSpring,
   withTiming,
 } from 'react-native-reanimated';
 
 /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
  * LTI update could not be added via codemod */
 // const handleRotate=(progress)=>{
 //   'worklet'
 //   return `${progress.value* Math.PI}rad`}
     
 
 const App = () => {
   const progress = useSharedValue(1);
   const scale = useSharedValue(2);
 const handleRotate=(progress)=>{
   'worklet'
   return `${progress.value* Math.PI}rad`}
 
   const reanimatedStyle = useAnimatedStyle(() => {
     return {
       opacity: progress.value,
       borderRadius:(progress.value*100.0)/2,
       transform:[{scale:scale.value},
         {rotate:`${progress.value* Math.PI}rad`}
         // {rotate:handleRotate(progress.value)}
       ],
       
     };
   }, []);
   useEffect(()=>{
     progress.value=withRepeat(withTiming(0.5),-1,true)
     scale.value=withRepeat(withSpring(1),-1,true)
   },[])
   return (
     <SafeAreaView
       style={{
         flex: 1,
         backgroundColor: 'white',
         alignItems: 'center',
         justifyContent: 'center',
       }}>
 
       <Animated.View
         style={[{height: 100, width: 100, backgroundColor: 'red'},reanimatedStyle]}
       />
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 