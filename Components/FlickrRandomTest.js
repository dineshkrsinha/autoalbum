import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';


global.url  = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
var FlickrRandomBase = require( './FlickrRandomBase');

export default class FlickrRandomTest extends FlickrRandomBase {

    constructor(props) {
        super(props);
         console.log("xxxxx", props);
    }
    
     componentWillMount() {
        if(this.state.isTest)
        {
            this.TestInvalidLink();
            this.TestUniqueness();
            this.TestWeirdData();
        }
    }
    
     render() {
        return <View>
          {this.renderVerbose()}
            <Text style={{ margin: 8 }}>Test = {this.state.testName}, result={this.state.testResult}</Text>
     </View>
    }
    
    
     
 SetTestParas(testName, testResult)
  {
    this.setState({
                            testName:testName,
                            testResult:testResult
                        });
    this.forceUpdate();
 }

  
  TestInvalidLink()
  {
       this.SetTestParas("TestInvalidLink", "running");
       this.state.onlyurls = new Array();
       global.url  = 'http://www.google.com';
       this.FetchData(null);
        global.url  = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
        console.log("Unittest-", "TestInvalidLink-", "result=", (this.state.onlyurls.length == 0));
         this.SetTestParas("TestInvalidLink", "success");
       
  }
  
  TestUniqueness()
  {
       this.SetTestParas("TestUniqueness", "running");
       this.state.onlyurls = new Array();
       this.FetchData(this.OnTestUniqueness);
        
  }
  
  
  OnTestUniqueness(that)
  {
        
       var result = true;
       var state = that.state;
       var map = new Object();
       var arrayLength = state.onlyurls.length;
       console.log("Unittest-", "TestUniqueness-", "result=", (arrayLength));
       for ( var i = 0; i < arrayLength; ++i)
      {
        var s = state.onlyurls[i];
        if(map[s])
        {
            console.log("...***.... TestUniqueness failed");
            result =  false;
            break;
        }
        map[s]  = s;
    }
     console.log("Unittest-", "TestUniqueness-", "result=", (result == true));
    that.SetTestParas("TestUniqueness", "complete");
}
  
  
MakeDataWeird(data)
{
    data.replace("www.flickr.com", "www1234567890.234567890234567890234567890234567890234567890234567890234567890234567890234567890234567890.com");
}

  TestWeirdData()
  {
     this.SetTestParas("TestWeirdData", "running");
       this.state.onlyurls = new Array();
       this.FetchData(this.OnTestWeirdData, this.MakeDataWeird);
  }
  
  OnTestWeirdData(that)
  {
        
       var result = true;
       var state = that.state;
        if(state.onlyurls.length != 20)
           result = false;
       console.log("Unittest-", "TestWeirdData-", "result=", (result));      
      that.SetTestParas("TestWeirdData", "complete");
}
  
  TestBandwidth()
  {
    //set bandwidth and see if hte performance is good
    //fetch data and see the time interval for the network state is within the success interval
     //FetchData();
  }
  
  TestPerfomance()
  {
    //note time
     //FetchData();
     //note time
     //see if the interval is below a set value
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

module.exports=FlickrRandomTest;