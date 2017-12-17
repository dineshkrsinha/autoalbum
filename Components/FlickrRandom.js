import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Dimensions,
  StyleSheet,
  Image
} from 'react-native';
const timer = require('react-native-timer');
import TimerMixin from 'react-timer-mixin';



import Item from './Item';

export default class FlickrRandom extends Component {
    
    
mixins: [TimerMixin];

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
            counter:1
        };
        this.state.onlyurls = new Array();
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
                        var val=  { title: item.author.split(' ')[0], date: item.published, url: item.media.m };
                        var url = item.media.m;
                        this.state.onlyurls.push(url);
                        console.log("...url,,,,,=start", url);
                        return val;
                    })
                )
            }))
            .catch((error) => console.log('Error' + error))
            .done();
    }
    
    
    /*componentDidUpdate(prevProps, prevState) {
   this.setTimeout(
      () => { console.log('I do not leak!'); },
      5000
    );
  }*/
  

componentDidMount() {

    this.interval = setInterval(() => {
        result = this.state.counter + 1;
        
        var array = this.state.dataSource;
        console.log(".......before xxxxx");
        console.log(array);
        console.log(".......before crash");
        //console.log(this.state.onlyurls);
        //array.splice(0, 1);
        var arrayLength = this.state.onlyurls.length;
        console.log("...url,,,,,=start");
        for (var i = 0; i < arrayLength; i++) {
            console.log("...url,,,,,=", this.state.onlyurls[i]);
        }
        console.log("...url,,,,,=end");
        
         var onlyurls = this.state.onlyurls;
         onlyurls.splice(0, 1);

    
       this.setState({
          //dataSource: array,
           counter:result,
           onlyurls:onlyurls
       });
       

    }, 3000); //6 seconds

}



    
    componentWillUnmount() {
    //timer.clearTimeout(this);
    }


    render() {
        
        return (
            <View style={styles.mycontainer}>
                <Text style={{ margin: 8 }}>{this.props.title}</Text>
                <Text style={{ margin: 8 }}>{this.state.counter}</Text>
                 <Image source={{
                    uri: this.state.onlyurls[0]
                }}
               style={{
                   marginTop: 16,
                   width: 200,
                   height: 200
               }}/>
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