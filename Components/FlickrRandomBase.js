import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Dimensions,
  StyleSheet,
  Set,
  Image,
  span
} from 'react-native';
let timer = require('react-native-timer');
import TimerMixin from 'react-timer-mixin';
var FlickrRandomVerbose = require( './FlickrRandomVerbose');



global.url  = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

export default class FlickrRandomBase extends Component {
    mixins: [TimerMixin];
    defaultImage = 'http://www.bugaga.ru/uploads/posts/2012-09/1348745110_3d-art-narndt-9.jpg';
    
   
    ResetData(props)
    {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var timerInterval = global.defaultTimerInterval;
         if(props.timerInterval != 0)
            timerInterval = props.timerInterval;
            
        var isVerbose = global.defaultIsVerbose;
         if(props.verbose == true)
            isVerbose = true;
            
        var isTest = global.test;
         if(props.test == true)
            isTest = true;
       
        this.state = {
            dataSource: ds.cloneWithRows([
                { title: 'Item1', date: '21.04.2016', url: this.defaultImage },
                { title: 'Item2', date: '22.07.2015', url: this.defaultImage }
            ]),
            currentImage:0,
            totalImages:0,
            timerInterval: timerInterval,
            isVerbose: isVerbose,
          isTest: isTest,
             testName:"Start test",
             testResult:"starting"
        };
        
        this.state.onlyurls = new Array();
    }
    
    FetchData(callback, mutatedata)
    {
        const that = this;
        const url = global.url ;
        
        
        this.setState({
                            currentImage:0,
                            totalImages:0
                        });
        fetch(url).then((response) => {
            console.log("FetchData-", response._bodyInit);
            if(mutatedata)
            {
                mutatedata(response);
                console.log("FetchData-", response._bodyInit);
            }
            return JSON.parse(response._bodyInit);
        })
            .then((responseJson) => responseJson.items)
            .then((items) => that.setState({
                dataSource: that.state.dataSource.cloneWithRows(
                    items.map((item) => {
                        
                        var val=  { title: item.author.split(' ')[0], date: item.published, url: item.media.m };
                        var url = item.media.m;
                        this.state.onlyurls.push(url);
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
            .done(function(){
                if(callback)
                    callback(that);
                else
                    console.log("FetchData-" , "no callback");
                });
            
    }

    constructor(props) {
        super(props);
        this.ResetData(props);
    }
    

    componentWillMount() {
        if(!this.state.isTest)
            this.FetchData(null);
     }
     
componentDidMount() {
     if(this.state.isTest)
         return;
    this.interval = setInterval(() => {
        if(this.state.isTest)
            clearInterval(this.interval );
        result = this.state.currentImage + 1;
        if(this.state.onlyurls.length <=  1)
        {
            this.FetchData(null);
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
    
    
    renderBase()
    {
         return (
            <View style={styles.mycontainer}>
                     <Image source={{
                    uri: this.state.onlyurls[0]
                }}
               style={{
                   marginTop: 16,
                   width: 200,
                   height: 200
               }}/>
               <Text style={{ margin: 8 }}>{this.props.title}</Text>
            </View>);   
    }
    
     renderVerbose()
    {
         return (
            <View style={styles.mycontainer}>
                     <Image source={{
                    uri: this.state.onlyurls[0]
                }}
               style={{
                   marginTop: 16,
                   width: 200,
                   height: 200
               }}/>
               <Text style={{ margin: 8 }}>{this.props.title}</Text>
                <FlickrRandomVerbose currentImage = {this.state.currentImage} totalImages = {this.state.totalImages}></FlickrRandomVerbose>
            </View>);   
    }
    
     render() {
        if(this.state.isVerbose)
            return this.renderVerbose();
        return this.renderBase();
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

module.exports=FlickrRandomBase;