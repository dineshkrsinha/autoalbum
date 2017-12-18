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

global.defaultTimerInterval = 5000;

export default class FlickrRandom extends Component {
    mixins: [TimerMixin];
    defaultImage = 'http://www.bugaga.ru/uploads/posts/2012-09/1348745110_3d-art-narndt-9.jpg';
    
    ResetData(props)
    {
        //console.log("xxxxxxxx" , "data is reset");
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var timerInterval = global.defaultTimerInterval;
        if(props.timerInterval != 0)
            timerInterval = props.timerInterval;
        this.state = {
            dataSource: ds.cloneWithRows([
                { title: 'Item1', date: '21.04.2016', url: this.defaultImage },
                { title: 'Item2', date: '22.07.2015', url: this.defaultImage }
            ]),
            currentImage:0,
            totalImages:0,
            timerInterval: timerInterval
        };
        this.state.onlyurls = new Array();
    }
    
    FetchData()
    {
        const that = this;
        const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
        this.setState({
                            currentImage:0,
                            totalImages:0
                        });
        fetch(url).then((response) => {
            //console.log(response._bodyInit);
            return JSON.parse(response._bodyInit);
        })
            .then((responseJson) => responseJson.items)
            .then((items) => that.setState({
                dataSource: that.state.dataSource.cloneWithRows(
                    items.map((item) => {
                        
                        var val=  { title: item.author.split(' ')[0], date: item.published, url: item.media.m };
                        var url = item.media.m;
                        this.state.onlyurls.push(url);
                        //console.log("xxxxxxxx" , item.media.m, " and array length=", this.state.onlyurls.length);
                        ++this.state.totalImages;
                        onlyurls = this.state.onlyurls;
                        totalImages = this.state.totalImages;
                        this.setState({
                            totalImages:totalImages,
                            onlyurls:onlyurls
                        });
                        
                        return val;
                    })
                )
            }))
            .catch((error) => console.log('Error' + error))
            .done();
    }

    constructor(props) {
        super(props);
        //const window = Dimensions.get('window');
        this.ResetData(props);
    }
    

    componentWillMount() {
       this.FetchData();
    }

  

componentDidMount() {

    this.interval = setInterval(() => {
        result = this.state.currentImage + 1;
        if(this.state.onlyurls.length == 0)
        {
            //console.log("xxxxxxxx" , "resetting");
            this.FetchData();
        }
        else
        {
            var arrayLength = this.state.onlyurls.length;
            var onlyurls = this.state.onlyurls;
            onlyurls.splice(0, 1);
            this.setState({
                currentImage:result,
                onlyurls:onlyurls
            });
       }
     }, this.state.timerInterval); 
}

    componentWillUnmount() {
    }


    render() {
         return (
            <View style={styles.mycontainer}>
                <Text style={{ margin: 8 }}>{this.props.title}</Text>
                <Text style={{ margin: 8 }}>{this.state.currentImage}/{this.state.totalImages}</Text>
                 <Image source={{
                    uri: this.state.onlyurls[0]
                }}
               style={{
                   marginTop: 16,
                   width: 200,
                   height: 200
               }}/>
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