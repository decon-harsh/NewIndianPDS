import { ethers } from 'ethers'
var utils = require('ethers').utils;
import Web3Modal from "web3modal"
import React, {Component} from "react";
import { Button, Form, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Layout from "../components/Layout";

import { verificationAddress, provenanceAddress } from '../config'
import Verification from '../artifacts/contracts/VerificationContract.sol/VerificationContract.json'
import Provenance from '../artifacts/contracts/ProvenanceContract.sol/ProvenanceContract.json'

class IndianPDS extends Component {
state ={
  dataFlag:false,
  priceFlag:false,
  price:0
};


onSubmit=async()=>{
  
  this.setState({dataFlag:true});
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const verificationContract = new ethers.Contract(verificationAddress, Verification.abi, signer);
  const provenanceContract = new ethers.Contract(provenanceAddress, Provenance.abi, provider);

  // quota data
  const buyerquotaData = await verificationContract.getBuyerCurrentMonthlyQuota(101);
  const sellerstockData = await verificationContract.getSellerCurrentStock(100);
  console.log(buyerquotaData);
  console.log(sellerstockData);
}

calculate=()=>{
  this.setState({priceFlag:true,price:100});
}

  remainingData() {
    const data = [
      {
        header: 'Rice',
        description:
          '3 kg',
      },
      {
        header: 'Oil',
        description:
          '1 Litre',
      },
      {
        header: 'Wheat',
        description:
          '5 kg',
      },
    ];

    return (
    <>
    <h3>Remaining monthly qouta</h3>
    <Card.Group items={data} />
    </> );
  }

  renderData() {
    return (
    <>
    <h3>Current sell</h3>
    <Form onSubmit={this.calculate}>
      <Form.Field>
        <label>Rice</label>
        <input placeholder='Amount in kg' />
      </Form.Field>

      <Form.Field>
        <label>Oil</label>
        <input placeholder='Amount in litre' />
      </Form.Field>

      <Form.Field>
        <label>Wheat</label>
        <input placeholder='Amount in kg' />
      </Form.Field>
      <Button type='submit' primary>Calculate price</Button>
    </Form>
    {this.state.priceFlag ? <h3>Price : {this.state.price}</h3> : <></>}
    </> );
  }

  render() {
    return (
      <Layout>
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Aadhar No</label>
          <input placeholder='Aadhar No' />
        </Form.Field>
        <Button type='submit' primary>Submit</Button>
      </Form>

      {this.state.dataFlag==true?this.remainingData():<></>}
      {this.state.dataFlag==true?this.renderData():<></>}
      {this.state.dataFlag && this.state.priceFlag?<Button type='submit' primary style={{marginTop:"15px"}}>Pay</Button>:<></>}
      </Layout>
    );
  }
}

export default IndianPDS;