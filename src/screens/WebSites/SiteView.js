import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator,StatusBar } from 'react-native';
import { Button } from 'react-native-elements';

import { WebView } from 'react-native-webview';

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remoteUrl: props.route.params.remoteUrl
        }
       
        this.webviewRef={}
    }
   

    isShowBTS(){
            return(
                <Button
                onPress={()=>{this.webviewRef.current.goBack()}}
                    buttonStyle={{backgroundColor:"#d32f2f"}}
                    containerStyle={{marginBottom:10}}
                    title="back"
                />
            );
      
    }

    render() {
      const agent= this.state.remoteUrl == "https://tamilian.net"? "Mozilla/5.0 (Linux; Android 9; Pixel Build/PQ3A.190801.002; wv) AppleWebKit/537":"";
        return (
            <View style={{ flex: 1,backgroundColor:"#d32f2f"}}>
            <StatusBar/>
                {/* <View
                    style={{ width: "100%", alignItems: "center", backgroundColor: "#fff" }}
                >
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Choose torrent file </Text>

                </View> */}

                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={{ flex: 1 }}
                    allowsFullscreenVideo={true}
                    allowsInlineMediaPlayback={true}
                    source={{ uri: this.state.remoteUrl }}
                    ref={this.webviewRef}
                    allowUniversalAccessFromFileURLs={true}
                    allowFileAccess={true}
                    
                    allowsInlineMediaPlayback={true}
                    automaticallyAdjustContentInsets={true}
                    userAgent={agent}      
                    onShouldStartLoadWithRequest={request => {
    // Only allow navigating within this website
    // console.log("request.url",request.url );
    if(request.url.startsWith("http://d3.uptofiles.site")){
        return true;
    }else if(request.url.startsWith("https://www.expressmvs.com")){
        return true;
    } else{
        return request.url.startsWith(this.state.remoteUrl );
    }
    
    
  }}
                    
        allowFileAccessFromFileURLs={true}

                />
                {this.isShowBTS()}
                
            </View>
        );
    }
}