import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Dimensions,
  StyleSheet
} from 'react-native';
const timer = require('react-native-timer');


import Item from './Item';

export default class FlickrRandom extends Component {

    defaultImage = 'http://www.bugaga.ru/uploads/posts/2012-09/1348745110_3d-art-narndt-9.jpg';

    constructor(props) {
        super(props);
        const window = Dimensions.get('window');
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                { title: 'Item1', date: '21.04.2016', url: this.defaultImage },
                { title: 'Item2', date: '22.07.2015', url: this.defaultImage }
            ]),
        };
    }

    componentWillMount() {
        const that = this;
        
        const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
        
        fetch(url).then((response) => {
            console.log(response._bodyInit);
            return JSON.parse(response._bodyInit);
        })
            .then((responseJson) => responseJson.items)
            .then((items) => that.setState({
                dataSource: that.state.dataSource.cloneWithRows(
                    items.map((item) => {
                        return { title: item.author.split(' ')[0], date: item.published, url: item.media.m }
                    })
                )
            }))
            .catch((error) => console.log('Error' + error))
            .done();
    }

    render() {
        return (
            <View style={styles.mycontainer}>
                <Text style={{ margin: 8 }}>{this.props.title}</Text>

                <ListView
                   scrollEnabled={false}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Item flickrItem={rowData}/>}
                />
            </View>);
    }
    
  }
  
  
   const styles = StyleSheet.create({
  mycontainer: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  }
});



AppRegistry.registerComponent('FlickrRandom', () => FlickrRandom);