import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import { Video } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';





export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // movieData: props.route.params.movieData
        }
        // console.log("props.route.params.movieData", props.route.params.movieData);
    }
    

    // downloadFile(){
//     const uri = "https://yts.mx/torrent/download/9B6EB9CFD9F570FAA8142EDE01EE71946C7BFD36"
//     let fileUri = FileSystem.documentDirectory + `${this.state.movieData.title}(movie).torrent`;
//     FileSystem.downloadAsync(uri, fileUri)
//     .then(({ uri }) => {
//         this.saveFile(uri);
//       })
//       .catch(error => {
//         console.error(error);
//       })
// }
// saveFile = async (fileUri) => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     if (status === "granted") {
//         const asset = await MediaLibrary.createAssetAsync(fileUri)
//         await MediaLibrary.createAlbumAsync("Download", asset, false)
//     }
// }

    render() {
        return (
            <View>
                <Text>Video Player</Text>
                <Video
                    source={{ uri: 'magnet:?xt=urn:btih:8bbf356f07ea045ed73b967964f32e52011bf06e&amp;dn=Salyut-7+(2017)+%5B720p%5D+%5BBluRay%5D+%5BYTS.MX%5D&amp;tr=wss%3A%2F%2Ftracker.btorrent.xyz&amp;tr=wss%3A%2F%2Ftracker.fastcast.nz&amp;tr=wss%3A%2F%2Ftracker.openwebtorrent.com' }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: 300, height: 300 }}
                />
                <TouchableOpacity
                    // onPress={() => { this.downloadFile() }}
                >
                    <Text>  ok check</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});