
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import FlickrRandom from './Components/FlickrRandom';


export default class autoalbum extends Component<{}> {
  render() {
    return (
      <View>
          <FlickrRandom timerInterval={1000} verbose={true}/>
      </View>
    );
  }
}


AppRegistry.registerComponent('autoalbum', () => autoalbum);

