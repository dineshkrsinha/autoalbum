import React, { Component } from 'react';
var FlickrRandomBase = require( './FlickrRandomBase');
var FlickrRandomTest = require( './FlickrRandomTest');
import {
  Text,
  View,
   StyleSheet,
  Div
} from 'react-native';


global.defaultTimerInterval = 5000;
global.defaultIsVerbose = false;
global.test = false;

export default class FlickrRandom extends Component {
       
     
    constructor(props) {
        super(props);
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
            timerInterval: timerInterval,
            isVerbose: isVerbose,
            isTest: isTest,
        };
    }
        
  
  
  renderNormal()
    {
        return (
            <View>
                <FlickrRandomBase  timerInterval={this.state.timerInterval} verbose={this.state.isVerbose} test={this.state.isTest}> </FlickrRandomBase>
            </View>);
    }    
    
    renderTest()
    {
         return (
            <View>
                <FlickrRandomTest  timerInterval={this.state.timerInterval} verbose={this.state.isVerbose} test={this.state.isTest}> </FlickrRandomTest>
            </View>);
    }
  
  
  render() {
         if(this.state.isTest)
            return this.renderTest();
        return this.renderNormal();
  }
  }

module.exports=FlickrRandom;