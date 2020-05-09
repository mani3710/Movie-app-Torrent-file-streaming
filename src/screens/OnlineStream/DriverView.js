import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { WebView } from 'react-native-webview';
export default class index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:props.route.params.remoteUrl
        }
    }
   
    render(){
        
        return(
            <View style={{flex:1}}>
            <View
            style={{width:"100%",alignItems:"center",backgroundColor:"#fff"}}
            >
                <Text style={{fontWeight:"bold",marginLeft:10}}>Full screen option to enjoy</Text>
            </View>
              
                <WebView 
                automaticallyAdjustContentInsets={true}
                style={{flex:1}}
                allowsFullscreenVideo={true}
                allowsInlineMediaPlayback={true}
                source={{ uri: this.state.url }} />
            </View>
        );
    }
}