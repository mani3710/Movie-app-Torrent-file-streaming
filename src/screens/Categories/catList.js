import React, { Component } from 'react'
import {View,Text,FlatList,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
export default class index extends Component {
    constructor(props){
        super(props);
        this.state={
            movieDataList:[],
            currentPageNo:1,
            isShowActiveIndicator:true,
            genres:props.route.params.genres
        }
        this.getMovieList(1);
    }
    
    getMovieList(page){
        this.setState({isShowActiveIndicator:true});
        console.log(page,`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`);
        fetch(`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}&genre=${this.state.genres}`)
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
                style={{backgroundColor:"#212121",flex:1,}}
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
                {this.showIndicator()}
            </View>
        )
    }
    
}
