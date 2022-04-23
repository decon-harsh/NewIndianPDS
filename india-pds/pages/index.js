import { ethers } from 'ethers'
var utils = require('ethers').utils;
import Web3Modal from "web3modal"
import React, {Component} from "react";
import { Button, Form, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Layout from "../components/Layout";

import { verificationAddress, provenanceAddress } from '../config'
import Verification from '../artifacts/contracts/VerificationContract.sol/VerificationContract.json'

class IndianPDS extends Component {
state ={
  dataFlag:false,
  priceFlag:false,
  price:0,
  rice:0,
  wheat:0,
  oil:0,
  riceAmount:0,
  oilAmount:0,
  wheatAmount:0,
  buyerAadharNo:0,
  sellerAadharNo:0,
};


calcPrice = async(rice,wheat,oil) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const verificationContract = new ethers.Contract(verificationAddress, Verification.abi, signer);
  const totalPrice = await verificationContract.priceCalc(rice,wheat,oil);
  return totalPrice;
}

buy = async(buyerAadharNumber,sellerAadharNumber,rice,wheat,oil) => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const verificationContract = new ethers.Contract(verificationAddress, Verification.abi, signer);
  const totalPrice = this.calcPrice(rice,wheat,oil);
  // const price = this.state.price;
  console.log("Ded");
  console.log(totalPrice);
  const transaction = await verificationContract.buy(buyerAadharNumber,sellerAadharNumber,rice,wheat,oil,{ value: totalPrice });
  await transaction.wait();
}

onSubmit = async()=>{
  
  this.setState({dataFlag:true});
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const verificationContract = new ethers.Contract(verificationAddress, Verification.abi, signer);

  // quota data
  const buyerquotaData = await verificationContract.getBuyerCurrentMonthlyQuota(101);
  const sellerstockData = await verificationContract.getSellerCurrentStock(100);
  this.setState({
    rice:utils.arrayify(buyerquotaData['_rice']._hex)[0],
    oil:utils.arrayify(buyerquotaData['_oil']._hex)[0],
    wheat:utils.arrayify(buyerquotaData['_wheat']._hex)[0],
  });
  console.log(this.state.rice);
  console.log(sellerstockData);
  

}

calculate=async()=>{
  this.setState({priceFlag:true});
  const ans = await this.calcPrice(this.state.riceAmount,this.state.wheatAmount,this.state.oilAmount);
  //const ans = await this.calcPrice(1,1,1);
  console.log(parseInt(ans));
  this.setState({price:parseInt(ans._hex,16)});
  console.log(this.state.price);
}

  remainingData() {
    const data = [
      {
        header: 'Rice',
        description: this.state.rice + " kg"
      },
      {
        header: 'Oil',
        description: this.state.oil + " lt"
      },
      {
        header: 'Wheat',
        description: this.state.wheat + " kg"
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
        <input 
          placeholder='Amount in kg' 
          value={this.state.riceAmount}
          onChange={(event)=>this.setState({riceAmount:event.target.value})}
        />
      </Form.Field>

      <Form.Field>
        <label>Oil</label>
        <input 
          placeholder='Amount in litre' 
          value={this.state.oilAmount}
          onChange={(event)=>this.setState({oilAmount:event.target.value})}
        />

      </Form.Field>

      <Form.Field>
        <label>Wheat</label>
        <input 
          placeholder='Amount in kg' 
          value={this.state.wheatAmount}
          onChange={(event)=>this.setState({wheatAmount:event.target.value})}
        />
      </Form.Field>
      <Button type='submit' primary>Calculate price</Button>
    </Form>
    {this.state.priceFlag ? <>
                               <h3>Price : {this.state.price}  Ethers</h3> 
                               <Form onSubmit={this.buy(this.state.buyerAadharNo,this.state.sellerAadharNo,this.state.riceAmount,this.state.wheatAmount,this.state.oilAmount)}> 
                               <Form.Field>
                                  <label>Seller Aadhar No</label>
                                  <input 
                                    placeholder='Aadhar No' 
                                    onChange={(event)=>this.setState({sellerAadharNo:event.target.value})}
                                  />
                               </Form.Field>
                               <Button type='submit' primary>Pay</Button>
                               </Form>
                            </>: <></>}
    </> );
  }

  render() {
    return (
      <Layout>
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Aadhar No</label>
          <input 
            label='Enter your Aadhar No'
            placeholder='Aadhar No' 
            value={this.state.buyerAadharNo}
            onChange={(event)=>this.setState({buyerAadharNo:event.target.value})}
          />
        </Form.Field>
        <Button type='submit' primary>Submit</Button>
      </Form>

      {this.state.dataFlag==true?this.remainingData():<></>}
      {this.state.dataFlag==true?this.renderData():<></>}
      </Layout>
    );
  }
}

export default IndianPDS;