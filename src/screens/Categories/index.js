import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SearchBar, Card } from 'react-native-elements';
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
                    numColumns={3}
                    data={data}
                    style={{ marginLeft: 10, marginBottom: 15 }}
                    renderItem={({ item, key }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("cateList", { "genres": item.name,name:item.name })}

                                style={{ width: "30%", height: 80, alignItems: "center", justifyContent: "center", marginTop: 15, backgroundColor: item.color, marginRight: 10 }}
                                key={key}>


                                <Text style={{ color: "white", textAlign: "center", marginTop: 10 }}>{item.name}</Text>


                            </TouchableOpacity >
                        );
                    }}
                />

            </View>
        );
    }
}