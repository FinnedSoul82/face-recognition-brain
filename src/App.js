import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank.js'
import ParticlesBg from 'particles-bg';

// const returnClarifaiJSONRequest = (imageUrl) => {
//   const PAT = '47514910c8a7408bbaba37f47c688d71';
//   const USER_ID = 'finnedmarcus';       
//   const APP_ID = 'test';
//   const IMAGE_URL = imageUrl;

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
//   });
  
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };
//   return requestOptions;
// }



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event);
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg color={"#ffffff"} num={400} type={'cobweb'} bg={true}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange}/>
        {/* 
        
        <FaceRecognition /> */}
      </div>
    )
  }
}

export default App;
