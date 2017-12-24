import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default class FlickrRandomVerbose extends Component {
       
    
    render()
    {
    
         return (
            <View>
                <Text style={{ margin: 8 }}> {this.props.currentImage}/ {this.props.totalImages}</Text>

            </View>);
    }  
 }
  
  
const styles = StyleSheet.create({
  mycontainer: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
     padding:10,
     borderColor:'black'
  }
});

module.exports=FlickrRandomVerbose;