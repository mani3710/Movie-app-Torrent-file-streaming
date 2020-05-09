import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { WebView } from 'react-native-webview';

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            remoteUrl: props.route.params.remote
        }
        activateKeepAwake();
        this.webviewRef={}
    }
    componentDidMount() {
        activateKeepAwake();

    }

    componentWillUnmount() {

        deactivateKeepAwake();
    }

    isShowBTS(){
        if(this.state.remoteUrl=="https://webtor.io/"){
            return(
                <Button
                onPress={()=>{this.webviewRef.current.goBack()}}
                    buttonStyle={{backgroundColor:"#d32f2f"}}
                    containerStyle={{marginBottom:10}}
                    title="back"
                />
            );
        }else{
            return null;
        }
    }

    render() {

        return (
            <View style={{ flex: 1,backgroundColor:"#d32f2f"}}>
                <View
                    style={{ width: "100%", alignItems: "center", backgroundColor: "#fff" }}
                >
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Choose torrent file </Text>

                </View>

                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={{ flex: 1 }}
                    allowsFullscreenVideo={true}
                    allowsInlineMediaPlayback={true}
                    source={{ uri: this.state.remoteUrl }}
                    ref={this.webviewRef}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false  }
                    onShouldStartLoadWithRequest={request => {
    // Only allow navigating within this website
    return request.url.startsWith(this.state.remoteUrl);
  }}

                />
                {this.isShowBTS()}
                
            </View>
        );
    }
}