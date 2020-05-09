import React, { Component } from 'react';
import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native';
import { NavigationContainer,useNavigation ,StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import MovieDetails from '../screens/movieDetails';
import VideoPlayer from '../screens/videoPlayer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import Splash from '../screens/splash';
import Search from '../screens/Search';
import Categories from '../screens/Categories';
import CateList from '../screens/Categories/catList';
import Quality from '../screens/Quality';
import QualityList from '../screens/Quality/QualityList';
import Seeder from '../screens/Seedrs';
import Player from '../screens/Player';
import SeederList from '../screens/Seedrs/SeederList';
import logo from '../../assets/torrent-logo.png';
import OnlineStreamer from '../screens/OnlineStream';
import GoogleDriverView from '../screens/OnlineStream/DriverView';
import InstaStreaming from '../screens/instaStreaming';
import WebSite from '../screens/WebSites';
import SitesView from '../screens/WebSites/SiteView';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function HomeStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   headerLeft:()=>(
                       <Icon name="view-headline" size={40} color="#fff" 
                       containerStyle={{marginLeft:10}}
                       onPress={()=>{navigation.openDrawer()}}
                       />
                   )
                }}
            />
            <Stack.Screen 
            name="movieDetails" component={MovieDetails}
            options={{
                    title: 'Details',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
             <Stack.Screen 
            name="Player" component={Player}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
               <Stack.Screen 
            name="instastream" component={InstaStreaming}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
            

        </Stack.Navigator>
    );
}
function SearchStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Search" component={Search}
                options={{
                    title: 'Search',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   headerLeft:()=>(
                       <Icon name="view-headline" size={40} color="#fff" 
                       containerStyle={{marginLeft:10}}
                       onPress={()=>{navigation.openDrawer()}}
                       />
                   )
                }}
            />
            <Stack.Screen 
            name="movieDetails" component={MovieDetails}
            options={{
                    title: 'Details',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
             <Stack.Screen 
            name="Player" component={Player}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
              <Stack.Screen 
            name="instastream" component={InstaStreaming}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
            

        </Stack.Navigator>
    );
}
function CategoriesStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="categories" component={Categories}
                options={{
                    title: 'Categories',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   headerLeft:()=>(
                       <Icon name="view-headline" size={40} color="#fff" 
                       containerStyle={{marginLeft:10}}
                       onPress={()=>{navigation.openDrawer()}}
                       />
                   )
                }}
            />
            <Stack.Screen 
            name="cateList" component={CateList}
            options={ ({route})=>({
                    title: route.params.name,

                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                })}
            
             />
             <Stack.Screen 
            name="movieDetails" component={MovieDetails}
            options={{
                    title: 'Details',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
             <Stack.Screen 
            name="Player" component={Player}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
              <Stack.Screen 
            name="instastream" component={InstaStreaming}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
            

        </Stack.Navigator>
    );
}

function QualityStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="quality" component={Quality}
                options={{
                    title: 'Video quality',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   headerLeft:()=>(
                       <Icon name="view-headline" size={40} color="#fff" 
                       containerStyle={{marginLeft:10}}
                       onPress={()=>{navigation.openDrawer()}}
                       />
                   )
                }}
            />
            <Stack.Screen 
            name="qualityList" component={QualityList}
            options={ ({route})=>({
                    title: route.params.name,

                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                })}
            
             />
             <Stack.Screen 
            name="movieDetails" component={MovieDetails}
            options={{
                    title: 'Details',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
             <Stack.Screen 
            name="Player" component={Player}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
              <Stack.Screen 
            name="instastream" component={InstaStreaming}
            options={{
                    title: 'player',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
            

        </Stack.Navigator>
    );
}
function WebListStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Website" component={WebSite}
                options={{
                    title: 'Web sites',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   headerLeft:()=>(
                       <Icon name="view-headline" size={40} color="#fff" 
                       containerStyle={{marginLeft:10}}
                       onPress={()=>{navigation.openDrawer()}}
                       />
                   )
                }}
            />
            <Stack.Screen 
            name="sitesView" component={SitesView}
            options={ ({route})=>({
                    title: route.params.name,

                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                })}
            
             />
            
            

        </Stack.Navigator>
    );
}

function OnlineStreamStack() {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Online stream" component={OnlineStreamer}
                options={{
                    title: 'Google Streamer',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                   headerLeft:()=>(
                       <Icon name="view-headline" size={40} color="#fff" 
                       containerStyle={{marginLeft:10}}
                       onPress={()=>{navigation.openDrawer()}}
                       />
                   )
                }}
            />
             <Stack.Screen 
            name="Streamdriver" component={GoogleDriverView}
            options={{
                    title: 'Watch',
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                  
                }}
            
             />
             
           
            

        </Stack.Navigator>
    );
}
// function drawerNav() {
    
//     return (
//         <Drawer.Navigator 
//                 drawerStyle={{backgroundColor:"#000",color:"#fff"}}
//                 drawerContent={(props) => <CustomDrawer {...props} />}
                
            
                
//                 >
//                     <Drawer.Screen  name="homeStack" component={HomeStack} navigation={this.props.navigation} />
//                     <Drawer.Screen  name="search" component={Search} />
                  
//                 </Drawer.Navigator>
//     );
// }


const CustomDrawer = ({navigation}) => {
    
   
  return (
    <ScrollView  style={{ flex: 1,marginTop:"60%" }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   <Image
   source={logo}
       style={{width:50,height:50}}
   />
   <Text style={{color:"#fff",fontWeight:"bold",fontSize:22,marginTop:15}}>Torrent movies</Text>
    <View style={{backgroundColor:"gray",width:"100%",marginTop:10,height:3}}></View>
     <TouchableOpacity 
     onPress={()=>{navigation.navigate('homeStack')}}
     style={{padding:15}}><Text style={{color:"#fff",fontSize:18}}>Home</Text></TouchableOpacity>
       <TouchableOpacity    
     onPress={()=>{navigation.navigate('OnlineStreamStack')}}
     style={{padding:15}}><Text style={{color:"#fff",fontSize:18}}>Google Streaming</Text></TouchableOpacity>
     <TouchableOpacity    
     onPress={()=>{navigation.navigate('searchStack')}}
     style={{padding:15}}><Text style={{color:"#fff",fontSize:18}}>Search</Text></TouchableOpacity>
       <TouchableOpacity    
     onPress={()=>{navigation.navigate('categoriesStack')}}
     style={{padding:15}}><Text style={{color:"#fff",fontSize:18}}>Category</Text></TouchableOpacity>
      <TouchableOpacity    
     onPress={()=>{navigation.navigate('qualityStack')}}
     style={{padding:15}}><Text style={{color:"#fff",fontSize:18}}>Video quality</Text></TouchableOpacity>
     
     <TouchableOpacity    
     onPress={()=>{navigation.navigate('webListStack')}}
     style={{padding:15}}><Text style={{color:"#fff",fontSize:18}}>Web site</Text></TouchableOpacity>
     <Text style={{color:"#fff",marginTop:10}}>Version 1.6</Text>
     </View>
    </ScrollView>
  );
}
export default class index extends Component {
    render() {  
        return (
            <NavigationContainer>
                 
                 <Drawer.Navigator 
                drawerStyle={{backgroundColor:"#000",color:"#fff"}}
                drawerContent={(props) => <CustomDrawer {...props} />}
                
            
                
                >
                    <Drawer.Screen  name="homeStack" component={HomeStack} navigation={this.props.navigation} />
                    <Drawer.Screen  name="searchStack" component={SearchStack} />
                    <Drawer.Screen  name="categoriesStack" component={CategoriesStack} />
                    <Drawer.Screen  name="qualityStack" component={QualityStack} />
                    <Drawer.Screen  name="OnlineStreamStack" component={OnlineStreamStack} />
                    <Drawer.Screen  name="webListStack" component={WebListStack} />
                  
                </Drawer.Navigator>
    
 

            </NavigationContainer>
        )
    }
}
