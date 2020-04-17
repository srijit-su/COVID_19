import React,{ useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
//import CardColumns from 'react-bootstrap/CardColumns';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form';

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(" ");
  useEffect(() =>{
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
    ])
      .then(responderArr =>{
        setLatest(responderArr[0].data);
        setResults(responderArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountry = results.filter(item => {
    return search !=="" ? item.country.includes(search) : item;
  })
  const countries = filterCountry.map((data,i) =>{
    return (
      <Card key={i} bg="light" text="dark" className="text-center" style={{margin:"20px"}}>
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text style={{color:"blue"}}>Cases  {data.cases}</Card.Text>
          <Card.Text style={{color:"red"}}>Deaths  {data.deaths}</Card.Text>
          <Card.Text style={{color:"green"}}>Recovered  {data.recovered}</Card.Text>
          <Card.Text style={{color:"blue"}}>Today's Cases  {data.todayCases}</Card.Text>
          <Card.Text style={{color:"red"}}>Today's Deaths  {data.todayDeaths}</Card.Text>
          <Card.Text style={{color:"maroon"}}>Active  {data.active}</Card.Text>
          <Card.Text style={{color:"maroon"}}>Critical  {data.critical}</Card.Text>
        </Card.Body>
      </Card>
          
    );
  });



  var queries = [{
    columns: 2,
    query:'min-width:500px'
  }, {
    columns:3,
    query:'min-width:1000px'
  
  }];


  return (
    <div>
    <br /> 
    <h2 style = {{ textAlign : "center"}}>WORLD COVID-19 LIVE STATS</h2>
    <br />
      <CardDeck>
        
        <Card bg="info" text = "white"  className="text-center"  style={{borderRadius:"40px"}}>
          
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg ="danger" text={"white"}  className="text-center" style={{borderRadius:"40px"}}>
          
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
                {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg ="success" text={"white"}  className="text-center" style={{borderRadius:"40px"}}>

          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              {latest.recovered}
      </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form style={{margin:"40px"}}>
        <Form.Group controlId="formGroupSearch">
          
          <Form.Control type="text" placeholder="Search Country....(first letter must be in uppercase)" onChange={e => setSearch(e.target.value)}></Form.Control>
        </Form.Group>
      </Form>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
