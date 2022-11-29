import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AntiDesighn from 'react-native-vector-icons/AntDesign';
import Animated, {FadeIn, FadeOut, Layout, ZoomIn, ZoomInRight, ZoomOut} from 'react-native-reanimated';

const LIST_ITEM_COLOR = '#1798DE';
const items = new Array(10).fill(0).map((_, index) => ({id: index}));

export default function Magic_Layout_Animatiom() {
  const [itemesData, setItemData] = useState(items);
  const initialMode=useRef(true)
  useEffect(()=>{
    initialMode.current=false
  },[])
  const addItem = useCallback(() => {
    setItemData(currentitem => {
      const nextId = (currentitem[currentitem.length - 1]?.id ?? 0) + 1;
      return [...currentitem, {id: nextId}];
    });
  }, []);
  const onDelete = useCallback((itemId) => {
    setItemData(currentitem => {
      return currentitem.filter((item)=>item.id!==itemId)
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.floatingButton} onPress={addItem}>
        <AntiDesighn name="plus" size={30} color="white" />
      </TouchableOpacity>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}>
        {itemesData.map((item, index) => {
          return (
            <Animated.View
              style={styles.listItem}
              key={index.toString()}
              entering={initialMode.current? FadeIn.delay(100+index):FadeIn}
              exiting={FadeOut}
              layout={Layout.delay(100)}
              onTouchEnd={()=>onDelete(item.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  floatingButton: {
    backgroundColor: '#000000',
    height: 80,
    aspectRatio: 1,
    borderRadius: 40,
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
