import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SearchBar, Card,Divider } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import data from './data';
import * as ScreenOrientation from 'expo-screen-orientation';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],


        }
    }
    componentDidMount() {
        const navigation=this.props.navigation;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.setOreintation();
        });
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }
      setOreintation(){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#212121", alignItems: "center" }}>
                <FlatList
                    
                    data={data}
                    style={{ marginLeft: 10, marginBottom: 15,flex:1 }}
                    renderItem={({ item, key }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("qualityList", { "genres": item.name,name:item.name })}

                                style={{ width: "100%", height: 80, alignItems: "center", justifyContent: "center", marginTop: 15,  marginRight: 10,borderBottomColor:"#455A64" }}
                                key={key}>


                                <Text style={{ color: "white", textAlign: "center", marginTop: 10,fontSize:18,fontWeight:"bold" }}>{item.name}</Text>

                                   <Divider style={{backgroundColor:"#FFEB3B",height:2,width:"95%"}}/>
                            </TouchableOpacity >
                        );
                    }}
                />

            </View>
        );
    }
}