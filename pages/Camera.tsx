import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { masterStyles, homeStyles, darkPrimary } from '../styles/master';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import {Camera} from 'expo-camera';


export interface Props {}

const CameraView: React.FC<Props> = (props) => {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState<any>(null);

    let camera: Camera | null;

    const CameraPreview = ({photo}: any) => {
        console.log('sdsfds', photo)
        return (
          <View
            style={{
              backgroundColor: 'transparent',
              flex: 1,
              width: '100%',
              height: '100%'
            }}
          >
            <ImageBackground
              source={{uri: photo && photo.uri}}
              style={{
                flex: 1
              }}
            />
          </View>
        )
      }

    const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
      }

    return (
    <>    
    {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} />
    ): (
        <Camera
        style={{flex: 1,width:"100%"}}
        ref={(r) => {
            camera = r
        }}>
            <View
            style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between'
            }}
            >
            <View
            style={{
            alignSelf: 'center',
            flex: 1,
            alignItems: 'center'
            }}
            >
                <TouchableOpacity
                onPress={__takePicture}
                style={{
                width: 70,
                height: 70,
                bottom: 0,
                borderRadius: 50,
                backgroundColor: '#fff'
                }}
                />
        </View>
        </View>
        </Camera>
    )
        }
    </>
    );
}

export default CameraView;