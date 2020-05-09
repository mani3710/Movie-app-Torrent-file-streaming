import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import { SearchBar, Card,Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ScreenOrientation from 'expo-screen-orientation';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDataList: [],
            searchText: "",
            isShowSpinner: false,
            isShowActiveIndicator:false,
            currentPage:0,
            isShowActiveIndicator:false

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
    getMovieList(search,page){this.setState({currentPage:1,isShowActiveIndicator:true})
        this.setState({isShowActiveIndicator:true});
        console.log("request send ......");
       
        fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${search}&limit=50&page=${page}`)
        .then(res=>res.json())
        .then((response)=>{
            
            if(page ==1){
                this.setState({movieDataList:response.data.movies,isShowActiveIndicator:false});
            }else{
                 
                
                var m=this.state.movieDataList.concat(response.data.movies);
                console.log("existing.......",typeof(m));

                 this.setState({movieDataList:m,isShowActiveIndicator:false});
               
            }

            
        })
    }

    renderData() {
        if (this.state.movieDataList) {
            return (
                <FlatList
                numColumns={3}
                    data={this.state.movieDataList}
                    style={{flex:1,width:"100%"}}
                    
                    renderItem={({ item, key }) => {
                        return (
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
                    
                    this.getMovieList(this.state.searchText,this.state.currentPage+1);
                    this.setState({currentPageNo:this.state.currentPage+1})
                 }}
                 onEndReachedThreshold={0.5}
                />
            );
        } else {
            return (
                <Text style={{ color: "#757575",marginTop:10,fontSize:18,fontWeight:"bold" }}>Not found !</Text>
            );
        }
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
            <View style={{ flex: 1, backgroundColor: "#212121", alignItems: "center" }}>
                <SearchBar
                    placeholder="Enter the movie name"
                    value={this.state.searchText}
                    onSubmitEditing={()=>{
                        this.setState({currentPage:1});
                        this.getMovieList(this.state.searchText,1)}}
                    onChangeText={(e) => { this.setState({ searchText: e }) }}
                    containerStyle={{ backgroundColor: "transparent", width: "85%", borderBottomColor: "transparent", marginTop: 10,borderTopColor: "transparent" }}
                    inputContainerStyle={{ height: 50 }}
                />
                <View style={{flex:1,width:"100%"}}>
    {this.renderData()}
    {this.showIndicator()}
    </View>


                <Spinner
                    visible={this.state.isShowSpinner}
                    color="#fff" />
            </View>
        );
    }
}