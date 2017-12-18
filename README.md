#**autoalbum**
This code containes a React Native component - Compoments/FlickrRandom.js . This component randomly displays a public image from flickr. 
There is also a test application that demonstrates the usage of this component.

##**Usage of test application**
Download the code from git  
npm install  
react-native start  
react-native run-ios (for ios)  
or react-native run-android (for android)  

##**Usage of FlickrRandom component**
To use the FlickrRandom component, make sure to place it in the right folder.
Link it from the calling component - eg import FlickrRandom from './Components/FlickrRandom';
Call the component.

##**Parameters of FlickrRandom component**
All parameters are optional.
timerInterval - value in millseconds. Default value 5000. This value controls the interval for switching images
verbose=default is false. This value controls if extra information is displayed for debugging purpose
test=default is false. Ran the test cases.

##**Design**
This component is designed to fetch 20 random images at a time. Once the 20 images are viewed it fetches a new batch of 20 images.


##**Testcases**
Test cases are writtin but not complete for 
TestInvalidLink - checks when the link is invalid for expected reponse.
TestUniqueness - checks to see if the response urls are unique
TestWeirdData - checks to see behavior when very long strings and null values are sent
TestBandwidth - behavior when bandwidth is limited
TestPerfomance-time taken for each fetch
