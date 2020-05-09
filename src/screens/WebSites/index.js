import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, AsyncStorage ,Linking,FlatList,Dimensions,TextInput,ToastAndroid, Clipboard,KeyboardAvoidingView,StatusBar} from 'react-native';
import { Button,Card } from 'react-native-elements';
import data from './data';
import * as ScreenOrientation from 'expo-screen-orientation';
export default class index extends Component {
    constructor(props){
        super(props);
        this.state={
            hashText:""
        }
    }
    copyTorrentURL(){
        var url="magnet:?xt=urn:btih:"+this.state.hashText;
        Clipboard.setString(url);
        ToastAndroid.showWithGravityAndOffset(
            'copied',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
       
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1,backgroundColor: "#212121" }}
                extraScrollHeight={300}
                enableOnAndroid={true}
            >
            <StatusBar/>
            <ScrollView scrollEnabled style={{flex:1}}>
            <View style={{ backgroundColor: "#212121", flex: 1 }}>
                <Text style={{  fontSize: 18, color: "#fff", marginTop: 15,marginRight:3,width:"100%",textAlign:"center" }}>Sites find torrent files or hash code :</Text>
                <View style={{width:"100%",alignItems:"center"}}>
                  <FlatList
                  data={data}
                  renderItem={({item,key})=>{
                      return(
                          <Card
                          containerStyle={{elevation:3,width:Dimensions.get('window').width-50,backgroundColor:"gray"}}
                          >
                          <TouchableOpacity 
                          onPress={()=>{this.props.navigation.navigate("sitesView",{remoteUrl:item.url})}}
                          style={{width:"100%",alignItems:"center"}}>
                              <Text style={{color:"#fff"}}>{item.name}</Text>
                          </TouchableOpacity>
                          
                     
                          </Card>
                      );
                  }}
                  />

                </View>
                {/* <View style={{width:"100%",alignItems:"center",margin:15}}>
                <Text style={{color:"gray",fontWeight:"bold"}}>Past the hash and copy torrent url:</Text>
                 <TextInput
                     value={this.state.hashText}
                     onChangeText={(e)=>{this.setState({hashText:e})}} 
                     placeholder="Past the hash"
                     style={{width:"80%",textAlign:"center",marginTop:15,borderColor:"gray",borderWidth:1,color:"white",height:40}}
                 />
                 <Button
                     title="copy"
                     containerStyle={{width:"50%",height:40,marginTop:15}}
                     buttonStyle={{backgroundColor:"transparent",borderColor:"white",borderWidth:1,borderRadius:10}}
                     onPress={()=>{this.copyTorrentURL()}}
                 />
                  
                </View> */}
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}