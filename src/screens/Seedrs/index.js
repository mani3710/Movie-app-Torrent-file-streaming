import React, { Component } from 'react'
import {View,Text,FlatList,Image,TouchableOpacity,ActivityIndicator,Linking} from 'react-native';
import {Button} from  'react-native-elements';
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
    
    getMovieList(page){
        this.setState({isShowActiveIndicator:true});
        console.log(page,`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`);
        fetch(`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}&sort_by=seeds&order_by=desc`)
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
                        
                        style={{width:"32%",height:180,alignItems:"center",justifyContent:"center",marginTop:15,}}
                        key={key}>
                        <Image
                        style={{width:"70%",height:"70%"}}
                        source={{uri:item.large_cover_image}}
                        ></Image>
                        <Text style={{color:"white",textAlign:"center",marginTop:10}}>{item.title}</Text>
                        

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
