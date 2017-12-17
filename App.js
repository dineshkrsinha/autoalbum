
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import Feed from './Components/FlickrRandom';


export default class autoalbum extends Component<{}> {
  render() {
    return (
      <View>
          <Feed/>
      </View>
    );
  }
}


AppRegistry.registerComponent('autoalbum', () => autoalbum);

