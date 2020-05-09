import React from 'react';
import {Text,View,AsyncStorage,Image,ActivityIndicator} from 'react-native';
import logo from '../../../assets/vienna_icon_withText.png';
import {NavigationActions,StackActions  } from '@react-navigation/native';



 export default function CustomDrawer ({navigation}) {
     
    const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'drawer' })],
});
function Movie(){
setTimeout(({})=>{
    this.props.navigation.dispatch(resetAction);
},1000)
}

   return (
    <View style={{justifyContent:"center",alignItems:"center"}}>
                <Image
                source={logo}
                />
               
                <ActivityIndicator
                color={"#fff"}
                size={50}
                />
{this.Movie()}
            </View>
   );
 }



