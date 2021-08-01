import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: '',
      lat: '',
      lon: '',
      showMap: false,
    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    let cityName = event.target.city.value;
    console.log(cityName);
    // let key ='pk.63c388e715285390690165b87c5f6e49';
    let URL = `https://eu1.locationiq.com/v1/search.php?key=pk.63c388e715285390690165b87c5f6e49&q=Empire State Building&format=json`

    let location = await axios.get(URL);
    // console.log(location.data[0].display_name)
    this.setState({
      display_name: location.data[0].display_name,
      lon: location.data[0].lon,
      lat: location.data[0].lon,
      showMap: true

    })
  }
  render() {
    return (
      <>
        <h1> City Explorer</h1>
        <Form onSubmit={this.getLocationData}>
          <Form.Group >
            <Form.Label  ></Form.Label>
            <Form.Control placeholder='Empire State Building Location ...' name='city' style={{ width: "20rem" }} />
            <Button type='submit ' style={{ width: "8rem", height: "2rem", color: "blue" }}> Explore! </Button>
          </Form.Group>
        </Form>
        <p>
          Area Name :
          {this.state.display_name}
        </p>
        <p> longitude :
          ({this.state.lon})
        </p>
        <p>
          Latitude :
          ({this.state.lat})
        </p>
        {
        this.state.showMap &&
          < img src={`https://maps.locationiq.com/v3/staticmap?key=pk.63c388e715285390690165b87c5f6e49&center=${this.state.lat},${this.state.lon}zoom =18`} alt='map' />
  }
      </>
    )
  }
}
export default App;