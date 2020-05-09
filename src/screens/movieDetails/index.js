import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ToastAndroid, Clipboard, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Dialog } from 'react-native-simple-dialogs';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Card, Button, Icon } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import * as ScreenOrientation from 'expo-screen-orientation';
import data from './siteData';




export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: props.route.params.movieData,
            isShowSuccess: false,
            isShowSpinner: false,
            isShowPlayDialog: false,
            isShowWhichSite: false,
            selectedURL: "",
            selectedQuality: "",
            isShowFavDialog:false

        }
        console.log("props", this.props.route.params.movieData);
        //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.setOreintation();
    }
    componentDidMount() {
        const navigation = this.props.navigation;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.setOreintation();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    setOreintation() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    // componentDidMount() {
    //     const { navigation } = this.props;

    //     this.focusListener = navigation.addListener('didFocus', () => {
    //         // The screen is focused
    //         // Call any action

    //         this.setOreintation();

    //     });  
    // }
    // componentWillUnmount() {
    //     // Remove the event listener
    //     this.focusListener.remove();
    // }



    downloadFile(url, quality,isAdd) {
        const uri = url;
        this.setState({ isShowSpinner: true })
        let fileUri = FileSystem.documentDirectory + `${this.state.movieData.title} (${quality}).torrent`;
        FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
                this.saveFile(uri,isAdd);
            })
            .catch(error => {
                console.error(error);
                this.setState({ isShowSpinner: false })
            })
    }
    saveFile = async (fileUri,isAdd) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            var pathFor=isAdd ? "torrent/favorite":"torrent";
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync(pathFor, asset, false)
            this.setState({ isShowSuccess: true, isShowSpinner: false });
            ToastAndroid.showWithGravityAndOffset(
                'Downloaded!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );



        }

    }
    renderItemWithMag(url) {
        console.log("url", url)
        // //    fetch(url).then(res=>res.json()).then((response)=>console.log("response",response)).catch(error=>console.log("error",error));
        var element = streamer(url);
        element.on("ready", (file) => {
            console.log("file", file.name);
        })


    }
    isShowTrailer() {
        if (this.state.movieData.yt_trailer_code) {
            return (
                <YoutubePlayer

                    height={360}
                    width={Dimensions.get('window').width}
                    videoId={this.state.movieData.yt_trailer_code}


                    onChangeState={event => console.log(event)}
                    fullscreen
                    volume={100}
                    playbackRate={1}


                />
            );
        } else {
            return (
                <Image
                    style={{ width: "85%", height: "95%" }}
                    resizeMode='contain'
                    source={{ uri: this.state.movieData.large_cover_image }}

                ></Image>
            );
        }
    }
    render() {
        return (
            <View
                //  source={{uri:this.state.movieData.large_cover_image}}
                style={{ flex: 1, backgroundColor: "#212121", width: null, height: null }}
                scrollEnabled
            >

                <ScrollView
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, marginTop: 15, marginLeft: 10 }}>

                        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
                            {this.state.movieData.title_long}
                        </Text>
                        <View style={{ width: "100%", height: 250, alignItems: "center", marginTop: 15 }}>
                            {this.isShowTrailer()}

                        </View>
                        <View style={{ flexDirection: "row", width: "100%", alignItems: "flex-end", marginLeft: 10 }}>
                            <Icon name="star" size={25} color="#F57C00" />
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}> {this.state.movieData.rating}</Text>
                        </View>
                        <View style={{ marginTop: 15, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 15, color: "#fff", fontSize: 20, fontWeight: "bold" }}>Summary :</Text>
                            <Text style={{ marginBottom: 15, color: "#fff", fontSize: 15, lineHeight: 30 }} >{this.state.movieData.summary}</Text>
                        </View>
                        <View style={{ marginTop: 15, marginBottom: 10 }}>
                            <Text style={{ marginBottom: 15, color: "#fff", fontSize: 20, fontWeight: "bold" }}>Synopsis :</Text>
                            <Text style={{ marginBottom: 15, color: "#fff", fontSize: 15, lineHeight: 30 }} >{this.state.movieData.synopsis}</Text>
                        </View>

                    </View>
                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Button
                            title="Play video using torrent file"
                            containerStyle={{ width: "80%" }}
                            buttonStyle={{ backgroundColor: "#000" }}
                            onPress={() => {
                                //    this.props.navigation.navigate("instastream")
                                this.setState({ isShowWhichSite: true });
                            }}
                        />
                    </View>

                    <View style={{ width: "100%", alignItems: "center" }}>
                        <Text style={{ marginTop: 10, color: "#757575", fontSize: 18 }}>Video quality:</Text>
                    </View>
                    <FlatList
                        style={{ marginTop: 15, width: "100%", marginBottom: 20 }}
                        data={this.state.movieData.torrents}
                        renderItem={({ item, key }) => {
                            return (
                                <View
                                // onPress={()=>{
                                //                     //    this.setState({isShowPlayDialog:false});
                                //                        var url=`https://wolfozzotorrent.herokuapp.com/#magnet:?xt=urn:btih:${item.hash}&dn=${item.url}&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent`

                                //                        this.props.navigation.navigate("Player",{remoteUrl:url})

                                //                        }}

                                >
                                    <Card containerStyle={{ elevation: 2, backgroundColor: "#424242" }}>
                                        <View style={{ alignItems: "center" }}>

                                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>{item.quality} </Text>
                                            <Text style={{ marginLeft: 10 }}>({item.size})</Text>
                                            <View style={{ alignItems: "center", flexDirection: "row", marginTop: 5 }}>
                                                <Text style={{ color: "#757575", marginRight: 10 }}>Seeds :</Text>
                                                <Text style={{ color: "#fff", marginRight: 10, fontWeight: "bold" }}>{item.seeds}</Text>
                                                <Text style={{ color: "#757575", marginRight: 10 }}>Peers</Text>
                                                <Text style={{ color: "#fff", marginRight: 10, fontWeight: "bold" }}>{item.peers}</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: "100%", alignItems: "center", flexDirection: "row", marginTop: 10 }}>
                                            <Button
                                                onPress={() => {
                                                    //    this.setState({isShowPlayDialog:false});
                                                    var url = `https://wolfozzotorrent.herokuapp.com/#magnet:?xt=urn:btih:${item.hash}&dn=${item.url}&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent`

                                                    this.props.navigation.navigate("Player", { remoteUrl: url })

                                                }}
                                                title="Direct download / Watch online"
                                                containerStyle={{ width: "40%", borderColor: "#fff", borderWidth: 2, marginRight: "20%" }}
                                                buttonStyle={{ backgroundColor: "transparent" }}
                                                titleStyle={{ fontSize: 10, color: "#fff" }}
                                            ></Button>
                                            <Button
                                                onPress={() => {
                                                    // this.downloadFile(item.url, item.quality);
                                                    this.setState({selectedQuality:item.quality,selectedURL:item.url,isShowFavDialog:true})

                                                }}
                                                title="Download torrent file"
                                                containerStyle={{ width: "40%", borderColor: "#fff", borderWidth: 2 }}
                                                buttonStyle={{ backgroundColor: "transparent" }}
                                                titleStyle={{ fontSize: 10, color: "#fff" }}
                                            ></Button>

                                        </View>


                                    </Card>


                                </View>
                            );
                        }}
                    ></FlatList>

                </ScrollView>
                <Dialog

                    visible={this.state.isShowSuccess}
                    title="success"
                >
                    <View>

                        <View>
                            <Text>Go and Click blow path file:</Text>
                            <Text style={{ fontWeight: "bold" }}>FileManager -> Download -> {this.state.movieData.title}.torrent</Text></View>
                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "80%" }}>


                            <Text
                                onPress={() => { this.setState({ isShowSuccess: false }) }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>ok </Text>
                        </View>
                    </View>
                </Dialog>
                {/* <Dialog
                   style={{backgroundColor:"red"}}
                    visible={this.state.isShowPlayDialog}
                    title="Copy and past hash code next screen "
                >
                    <View >

                        <FlatList
                            
                            style={{ marginTop: 15, width: "100%", marginBottom: 20, height: 250 }}
                            data={this.state.movieData.torrents}
                            renderItem={({ item, key }) => {
                                return (
                                    <View

                                    >
                                        <Card containerStyle={{ elevation: 2, backgroundColor: "#424242", borderRadius: 10 }}>
                                            <View style={{ alignItems: "center", marginBottom: 10 }}>

                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>{item.quality} </Text>

                                             
                                                <View style={{ width: "100%", alignItems:"center",flexDirection:"row",}}>
                                                   <Button
                                                   onPress={()=>{
                                                       
                                                    Clipboard.setString(item.hash);
                                                    ToastAndroid.showWithGravityAndOffset(
                                                                'Copied!',
                                                                ToastAndroid.LONG,
                                                                ToastAndroid.BOTTOM,
                                                                25,
                                                                50
                                                            );
                                                       
                                                       
                                                       }}
                                                       title="Click to copy hash code"
                                                       containerStyle={{width:"40%",borderColor:"#fff",borderWidth:2,marginRight:"20%"}}
                                                       buttonStyle={{backgroundColor:"transparent"}}
                                                       titleStyle={{fontSize:10,color:"#fff"}}
                                                   ></Button>
                                                    <Button
                                                  onPress={()=>{
                                                       this.setState({isShowPlayDialog:false});
                                                       var url=`https://wolfozzotorrent.herokuapp.com/#magnet:?xt=urn:btih:${item.hash}&dn=${item.url}&tr=http://track.one:1234/announce&tr=udp://track.two:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=dp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969`
                                                       this.props.navigation.navigate("Player",{remoteUrl:url})}}
                                                       title="After copied move to play"
                                                       containerStyle={{width:"40%",borderColor:"#fff",borderWidth:2}}
                                                       buttonStyle={{backgroundColor:"transparent"}}
                                                       titleStyle={{fontSize:10,color:"#fff"}}
                                                   ></Button>
                                                   
                                                </View>
                                            </View>


                                        </Card>


                                    </View>
                                );
                            }}
                        ></FlatList>
                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "70%" }}>


                            <Text
                                onPress={() => { 
                           
                                    
                                    this.setState({ isShowPlayDialog: false }) }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>Cancel </Text>
                        </View>
                    </View>
                </Dialog> */}


                <Dialog
                    style={{ backgroundColor: "red" }}
                    visible={this.state.isShowWhichSite}
                    title="Select server "
                    dialogStyle={{ backgroundColor: "black" }}
                    titleStyle={{ color: "white" }}
                >
                    <View >

                        <FlatList

                            style={{ marginTop: 15, width: "100%", marginBottom: 20, height: 250 }}
                            data={data}
                            renderItem={({ item, key }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isShowWhichSite: false })
                                            this.props.navigation.navigate("instastream", { remote: item.url })
                                        }}
                                        key={key}>
                                        <Card>
                                            <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
                                            {/* <Text style={{ textAlign: "center", marginTop: 10 }}>{item.ad ? "Ads" : "No ads"}</Text> */}
                                        </Card>
                                    </TouchableOpacity>
                                );
                            }}
                        ></FlatList>
                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginLeft: "70%" }}>


                            <Text
                                onPress={() => {


                                    this.setState({ isShowWhichSite: false })
                                }}
                                style={{ marginRight: 10, marginLeft: 10, color: "green", padding: 5 }}>Cancel </Text>
                        </View>
                    </View>
                </Dialog>
                <Dialog
                    style={{ backgroundColor: "red" }}
                    visible={this.state.isShowFavDialog}
                    title="Add to favorite "
                    dialogStyle={{ backgroundColor: "black" }}
                    titleStyle={{ color: "white" }}
                >
                    <View >

                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: 10 }}>


                            <Button
                                title="No"
                                containerStyle={{ width: 100 }}
                                buttonStyle={{ backgroundColor: "#d32f2f" }}
                                onPress={() => { 
                                    this.setState({ isShowFavDialog: false })
                                    this.downloadFile(this.state.selectedURL,this.state.selectedQuality,false);
                                     }}
                            />
                            <Button
                                title="Yes"
                                containerStyle={{ width: 100, marginLeft: "30%" }}
                                buttonStyle={{ backgroundColor: "#388E3C" }}
                                onPress={() => { 
                                    this.setState({ isShowFavDialog: false });
                                    this.downloadFile(this.state.selectedURL,this.state.selectedQuality,true);
                                     }}
                            />
                        </View>
                    </View>
                </Dialog>
                <Spinner
                    visible={this.state.isShowSpinner}
                    color="#fff" />
            </View>
        )
    }
}
