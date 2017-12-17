import React from 'react';
import { View, Image, Text , Dimensions, Window} from 'react-native';

export default ({ flickrItem }) => {
    return (
       //let {widthScreen, heightScreen} = Dimensions.get('window')
        <View style={{ flexDirection: 'column', padding: 20, borderWidth: 20, borderColor: 'black', margin: 8 }}>
            <Image source={{
                    uri: flickrItem.url
                }}
               style={{
                   marginTop: 16,
                   width: 200,
                   height: 200
               }}/>
        </View>);
}