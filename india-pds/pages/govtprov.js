import { ethers } from 'ethers'
var utils = require('ethers').utils;
import Web3Modal from "web3modal"
import React, {Component} from "react";
import { Button, Form, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Layout from "../components/Layout";

import { verificationAddress, provenanceAddress } from '../config'
import Provenance from '../artifacts/contracts/ProvenanceContract.sol/ProvenanceContract.json'

class IndianPDS extends Component {
state ={
  dataFlag:false,
  rfid:"",
  xcoor: "",
  ycoor: "",
  weight:0
};

getCurrentLocation= async(rfid) => {
  const provider = new ethers.providers.JsonRpcProvider();
  const provenanceContract = new ethers.Contract(provenanceAddress, Provenance.abi, provider);
  const length = await provenanceContract.getLocationSize(rfid);
  console.log(length);
  if(length!=0) {
    const currentLocation = await provenanceContract.getCurrentLocation(rfid,length-1);
    console.log(currentLocation);
    this.setState({
      xcoor:currentLocation["_locationX"],
      ycoor:currentLocation["_locationY"],
      weight:parseInt(currentLocation["_weight"],16)
    });
  }
  else{
    this.setState({xcoor:"0", ycoor:"0"});
  }
}

addLocation = async(rfid,weight,locationX,locationY) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const provenanceContract = new ethers.Contract(provenanceAddress, Provenance.abi, signer);
  await provenanceContract.addLocation(rfid,weight,locationX,locationY);
  this.getCurrentLocation(rfid);
}



onSubmit=()=>{
  this.setState({dataFlag:true});
  this.getCurrentLocation(this.state.rfid);
}

update=async()=>{
  await this.addLocation(this.state.rfid,this.state.weight,this.state.xcoor,this.state.ycoor);
}

  renderData() {
    const data = [
      {
        header: 'X cordinate',
        description: this.state.xcoor
      },
      {
        header: 'Y cordinate',
        description: this.state.ycoor
      },
      {
        header: 'Weight',
        description: this.state.weight
      },
    ];

    return (
    <>
    <h3>Current sell</h3>
    <Card.Group items={data} />
    <h3>Update stocks</h3>
    <Form onSubmit={this.update}>
      <Form.Field>
        <label>X Coordinate</label>
        <input 
          placeholder='X Coordinate'
          value={this.state.xcoor}
          onChange={(event)=>this.setState({xcoor:event.target.value})} 
        />
      </Form.Field>

      <Form.Field>
        <label>Y Coordinate</label>
        <input 
          placeholder='Y Coordinate' 
          value={this.state.ycoor}
          onChange={(event)=>this.setState({ycoor:event.target.value})}
        />
      </Form.Field>

      <Form.Field>
        <label>Weight</label>
        <input 
          placeholder='Weight' 
          value={this.state.weight}
          onChange={(event)=>this.setState({weight:event.target.value})}
        />
      </Form.Field>
      <Button type='submit' primary>Submit</Button>
    </Form>
    </> );
  }

  render() {
    return (
      <Layout>
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Rfid Tag</label>
          <input 
            placeholder='Rfid Tag' 
            value={this.state.rfid}
            onChange={(event)=>this.setState({rfid:event.target.value})}
          />
        </Form.Field>
        <Button type='submit' primary>Submit</Button>
      </Form>

      {this.state.dataFlag==true?this.renderData():<></>}

      </Layout>
    );
  }
}

export default IndianPDS;
