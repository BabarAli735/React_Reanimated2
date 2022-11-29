import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useRef } from 'react';
import FlatListItem from './FlatListItem';
import { useSharedValue } from 'react-native-reanimated';

const data = new Array(50).fill(0).map((item, index) => ({id: index}));
export default function AnimatedFlateList() {
   const viewableItems=useSharedValue([])
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        onViewableItemsChanged={({viewableItems:vItem})=>{
            // console.log(vItem);
            viewableItems.value=vItem
        }}
        renderItem={({item}) => {
          return (
           <FlatListItem viewAbleItems={viewableItems} item={item}/>
          );
        }}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
