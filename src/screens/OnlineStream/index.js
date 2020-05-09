import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, AsyncStorage ,Linking,FlatList,Dimensions} from 'react-native';
import { Button,Card } from 'react-native-elements';
import data from './data';
import * as ScreenOrientation from 'expo-screen-orientation';
export default class index extends Component {
    render() {
        return (
            <View style={{ backgroundColor: "#212121", flex: 1 }}>
                <Text style={{  fontSize: 18, color: "#fff", marginTop: 15,marginRight:3,width:"100%",textAlign:"center" }}>Select Driver :</Text>
                <View style={{width:"100%",alignItems:"center"}}>
                  <FlatList
                  data={data}
                  renderItem={({item,key})=>{
                      return(
                          <Card
                          containerStyle={{elevation:3,width:Dimensions.get('window').width-50,backgroundColor:"gray"}}
                          >
                          <TouchableOpacity 
                          onPress={()=>{this.props.navigation.navigate("Streamdriver",{remoteUrl:item.url})}}
                          style={{width:"100%",alignItems:"center"}}>
                              <Text style={{color:"#fff"}}>{item.name}</Text>
                          </TouchableOpacity>
                          
                     
                          </Card>
                      );
                  }}
                  />
                </View>
            </View>
        );
    }
}