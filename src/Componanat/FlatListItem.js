import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

const FlatListItem = memo(({item, viewableItems}) => {
  const isVisible = viewableItems.value
    .filter((item1) => item1.isViewable)
    .find((item2) => item2.item.id === item.id);
 
    console.log('++++++',viewableItems);
    const rStyle = useAnimatedStyle(() => {
    return {
      opacity: isVisible?1:0,
    };
  }, []);
  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: '90%',
          backgroundColor: 'red',
          marginTop: 20,
          alignSelf: 'center',
          borderRadius: 15,
        },
        rStyle,
      ]}
    />
  );
});

const styles = StyleSheet.create({});
export default FlatListItem;
