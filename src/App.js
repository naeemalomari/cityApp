

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
// import Weather from "./component/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display_name: "",
      lat: "",
      lon: "",
      showMap: false,
      errorMsg: "bad response",
      displayError: false,
      foreCast: "",
      weatherError: false,
      weatherText: "",
      weatherStrings: [],
    };
  }

  getLocationData = async (event) => {
    event.preventDefault();
    let cityName = event.target.city.value;
    try {
      // let key ='pk.63c388e715285390690165b87c5f6e49';
      let URL = `https://eu1.locationiq.com/v1/search.php?key=pk.63c388e715285390690165b87c5f6e49&q=${cityName}&format=json`;
      const location = await axios.get(URL);

      this.setState({
        display_name: location.data[0].display_name,
        lon: location.data[0].lon,
        lat: location.data[0].lat,
        showMap: true,
      });
    } catch {
      this.setState({
        displayMap: true,
        displayError: true,
      });
    }
    finally {
      this.getWeatherData();
    }
    
  };
  getWeatherData = async() => {

    try {
      // http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman
console.log(typeof this.state.lat)
      // let URL1=`http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}&searchQuery=Amman`;
      const weatherData = await axios.get(`http://localhost:3001/weather?lat=31.95&lon=35.91&searchQuery=Amman`);
       let foreCast = weatherData.data[0];

      let arrOfStrings = weatherData.data.map((item) => {
        return `${item.date} ${item.description}`;
      });
      console.log(arrOfStrings);
      this.setState({
        cityName: weatherData.cityName,
        lon:weatherData.lon,
        lat:weatherData.lat,
        weather: weatherData.data,
        weatherStrings: arrOfStrings,
        foreCast:foreCast,
        // showMap:true,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        weatherError: true,
        weatherText: " WINTER IS COMING ",
      });
    }
  }
  render() {
    return (
      <Container>
        <Row> 
        {/* <Weather />  */}
        </Row>
        <Row className="mt-5">
          <h1> City Explorer</h1>
        </Row>
        <Row className="mb-5">
          <Form onSubmit={this.getLocationData}>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                placeholder="Enter your location here  ..."
                name="city" 
                style={{ width: "20rem" }}
              />
              <Button type="submit "> Explore! </Button>
            </Form.Group>
          </Form>
        </Row>
        <Row className="mr-5">
          <p>City Name :{this.state.display_name}</p>
          <p> longitude :{this.state.lon}</p>
          <p>Latitude :{this.state.lat}</p>
          {this.state.showMap && (
            <img
              className="img-thumbnail ,rounded mx-auto d-block , mb-30"
              src={`https://maps.locationiq.com/v3/staticmap?key=pk.63c388e715285390690165b87c5f6e49&center=${this.state.lat},${this.state.lon}&zoom=15`}
              alt="map"
              style={{ width: "18rem" }}
            />
          )}
          {this.displayError && this.state.errorMsg}
        </Row>
        <Row className="mr-5">
        <h1>{this.state.weatherStrings[0]}</h1> 
           <h1>{this.state.weatherStrings[1]} </h1> 
           <h1>{this.state.weatherStrings[2]}</h1> 
       
        </Row>
      </Container>
    );
  }
}
export default App;
