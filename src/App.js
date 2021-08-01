import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      lat: '',
      lon: '',
      showMap: false,
      errorMsg :'bad response',
      dislpayError :false,

    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    let cityName = event.target.city.value;
    console.log(cityName);
    // let key ='pk.63c388e715285390690165b87c5f6e49';
    let URL = `https://eu1.locationiq.com/v1/search.php?key=pk.63c388e715285390690165b87c5f6e49&q=${cityName}&format=json`;


    try{
      
    let location = await axios.get(URL);
    // console.log(location.data[0].display_name)
    this.setState({
      display_name: location.data[0].display_name,
      lon: location.data[0].lon,
      lat: location.data[0].lat,
      showMap: true,

    })
    }
    catch {
      this.setState({
        displayMap:false,
        displayError :true,
      })
    }
  }
  render() {
    return (
      <Container>
          <Row className="mt-5">  
        <h1> City Explorer</h1>
        </Row>
        <Row className= "mb-5"> 
        <Form onSubmit={this.getLocationData}>
          <Form.Group >
            <Form.Label  ></Form.Label>
            <Form.Control placeholder='Enter your location here  ...' name='city' style={{ width: "20rem" }} />
            <Button type='submit ' > Explore! </Button>
          </Form.Group>
        </Form>
        </Row>
        <Row className= "mr-5"> 
        <p>
          City Name :
          {this.state.display_name}
        </p>
        <p> longitude :
          {this.state.lon}
        </p>
        <p>
          Latitude :
          {this.state.lat}
        </p>
        {
          this.state.showMap &&
          < img className="img-thumbnail ,rounded mx-auto d-block , mb-30"src={`https://maps.locationiq.com/v3/staticmap?key=pk.63c388e715285390690165b87c5f6e49&center=${this.state.lat},${this.state.lon}&zoom=15`} alt='map' style={{width : "18rem"}} />
        }
        {
        this.displayError&& this.state.errorMsg
        }
        </Row>
      </Container>
    )
  }
}
export default App;