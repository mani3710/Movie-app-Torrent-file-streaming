import React, { Component } from 'react'
import {View,Text,FlatList,Image,TouchableOpacity,ActivityIndicator,Linking} from 'react-native';
import {Button,Icon} from  'react-native-elements';
import * as ScreenOrientation from 'expo-screen-orientation';
export default class index extends Component {
    constructor(props){
        super(props);
        this.state={
            movieDataList:[],
            currentPageNo:1,
            isShowActiveIndicator:true
        }
        this.getMovieList(1);
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
    
    getMovieList(page){
        this.setState({isShowActiveIndicator:true});
        console.log(page,`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`);
        fetch(`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`)
        .then(res=>res.json())
        .then((response)=>{
            
            console.log("response ..................");
            
          
            if(page ==1){
                this.setState({movieDataList:response.data.movies,isShowActiveIndicator:false});
            }else{
                 
                
                var m=this.state.movieDataList.concat(response.data.movies);
                console.log("existing.......",typeof(m));

                 this.setState({movieDataList:m,isShowActiveIndicator:false});
               
            }
           
            
        })
    }
    showIndicator(){
        if(this.state.isShowActiveIndicator){
            return(
                <View style={{alignItems:"center",backgroundColor:"#212121",paddingBottom:10}}>
                <ActivityIndicator
                size="large" color="red"
                />
                </View>
            );
        }else{
            return null;
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                numColumns={3}
                scrollEnabled
                style={{backgroundColor:"#212121",flex:1}}
                data={this.state.movieDataList}
                renderItem={({item,key})=>{
                    return(
                        <TouchableOpacity 
                        onPress={()=>this.props.navigation.navigate("movieDetails",{"movieData":item})}
                        
                        style={{width:"32%",height:210,alignItems:"center",marginTop:15,}}
                        key={key}>
                        <View style={{ flexDirection: "row", alignItems: "center",marginBottom:5,marginTop:15 }}>
                            <Icon name="star" size={13} color="#F57C00" style={{marginLeft:"30%"}} />
                            <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}> {item.rating}</Text>
                        </View>
                        <Image
                        style={{width:"70%",height:"60%",flexWrap: 'wrap'}}
                        source={{uri:item.large_cover_image}}
                        ></Image>
                        <Text style={{color:"white",textAlign:"center",marginTop:10,height:50}} >{item.title_long}</Text>
                        

                        </TouchableOpacity >
                    );
                }}
                onEndReached={() => { 
                    
                    this.getMovieList(this.state.currentPageNo+1);
                    this.setState({currentPageNo:this.state.currentPageNo+1})
                 }}
                 onEndReachedThreshold={0.5}
                />
                {/* <Button
                    title="movie to player"
                    onPress={()=>{
                       
 
 Linking.openURL("market://details?id=com.jhp.a.st");

                    }}
                /> */}
                {this.showIndicator()}
            </View>
        )
    }
    
}
