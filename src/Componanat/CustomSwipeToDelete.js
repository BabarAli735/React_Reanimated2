import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ListItem from './ListItem'
import { ScrollView } from 'react-native-gesture-handler'


const BACKGROUND_COLOR='#fff'
export default function CustomSwipeToDelete() {
    const [tasksData,setTasks]=useState(TASK)
    const [id,setId]=useState()
    const scrollRef=useRef(null)
    const onDismiss=(task)=>{
        setId(task.id)
    }
   
    useEffect(()=>{
setTasks(tasksData.filter(item=>item.id!==id))
console.log(id);
    },[id])
console.log();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task</Text>
      <ScrollView style={{flex:1,}}
      ref={scrollRef}
      >
{tasksData?.map((item,index)=>{
    return(
        <ListItem key={index.toString()} task={item}
        onDismiss={onDismiss}
        simultaneousHandlers={scrollRef}
        />
    )
})}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:BACKGROUND_COLOR
    },
    title:{
        fontSize:60,
marginVertical:20,
paddingLeft:'5%',

    }
})

const TASK=[
    {
        id:1,
        title:`absdefg\u{1FAB9}`
    },
    {
        id:2,
        title:'abcdefg'
    },
    {
        id:3,
        title:'abcdefg'
    },
    {
        id:4,
        title:'abcdefg'
    },
]