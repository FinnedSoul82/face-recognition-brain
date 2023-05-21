import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ParticlesBg from 'particles-bg';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const returnClarifaiJSONRequest = (imageUrl) => {
  const PAT = '47514910c8a7408bbaba37f47c688d71';
  const USER_ID = 'finnedmarcus';       
  const APP_ID = 'test';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions;
}



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map((clarifaiFace) => {
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const requestOptions = returnClarifaiJSONRequest(this.state.input);
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => console.log(err));
  }
  
  onRouteChange = (route) => {
    if (route === "signout") {
      route = 'signin';
    }
    this.setState({route: route, isSignedIn: route === 'home' ? true : false});
    
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg color={"#ffffff"} num={200} type={'cobweb'} bg={true}/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
            <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
            </div>
          : (this.state.route === 'signin' 
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange} />
            )
        } 
      </div>
    )
  }
}

export default App;
