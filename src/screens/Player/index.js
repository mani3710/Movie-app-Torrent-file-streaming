import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';


import { WebView } from 'react-native-webview';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';
export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.route.params.remoteUrl
        }
        this.setOreintation();
       
    }
    componentDidMount() {
        activateKeepAwake();
        const navigation=this.props.navigation;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.setOreintation();
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
        deactivateKeepAwake();
      }
      setOreintation(){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    

    render() {

        return (

            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never' }}>
<Text style={{width:"100%",textAlign:"center",backgroundColor:"rgb(69, 90, 100)",fontSize:18,color:"#fff",fontWeight:"bold"}}>Download</Text>
<Text style={{width:"100%",textAlign:"center",backgroundColor:"rgb(69, 90, 100)",fontSize:12,color:"#fff",fontWeight:"bold"}}>(Note: Streaming video can't forward or backward)</Text>

                <WebView
                    automaticallyAdjustContentInsets={true}
                    style={{ flex: 1 }}
                    allowsFullscreenVideo={true}
                    allowsInlineMediaPlayback={true}
                    allowsFullscreenVideo={true}

                    source={{ uri: this.state.url }} />
                   <Text style={{width: 2, backgroundColor: "transparent", position: "absolute", marginTop: "13.5%", marginLeft: "4.5%",color: "#d32f2f", fontSize: 9, fontWeight: "bold",}}>Play Online :</Text>
                    <Text style={{width: 2, backgroundColor: "transparent", position: "absolute", marginTop: "15%", marginLeft: "4.5%",color: "#fff", fontSize: 8, fontWeight: "bold",}}>Hidden button Click left side of the line and wait 10 sec to Play online</Text>
                    
                
                <View
                    onStartShouldSetResponder={(evt) => false}
                    onMoveShouldSetResponder={(evt) => false}
                    style={{ width: 2, backgroundColor: "transparent", position: "absolute", marginTop: "18%", marginLeft: "11.5%" }}
                >

                    <View style={{ backgroundColor: "#fff", width: 2, height: 200, marginLeft: "10%" }}></View>


                </View>

            </SafeAreaView>

        );
    }
}