import React, {Component} from "react";
import { Button, Form, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { ethers } from 'ethers'
var utils = require('ethers').utils;
import Web3Modal from "web3modal"
import Layout from "../components/Layout";


import { verificationAddress, provenanceAddress } from '../config'
import Verification from '../artifacts/contracts/VerificationContract.sol/VerificationContract.json'

class IndianPDS extends Component {
  constructor(){
    super();
    this.state ={
      dataFlag:false,
      priceFlag:false,
      price:0,
      stock:[{
        header: 'Rice',
        description:
          '10 kg',
      },
      {
        header: 'Oil',
        description:
          '15 litre',
      },
      {
        header: 'Wheat',
        description:
          '5 kg',
      }]
    };
  }

onSubmit=()=>{
  this.setState({dataFlag:true});
  this.getSellerStock();
}

calculate = async()=>{
  this.setState({priceFlag:true,price:100});
  // const web3Modal = new Web3Modal();
  // const connection = await web3Modal.connect();
  // const provider = new ethers.providers.Web3Provider(connection);
  // const signer = provider.getSigner();
  // const verificationContract = new ethers.Contract(verificationAddress, Verification.abi, signer);
  // const totalPrice = await verificationContract.priceCalc(rice, wheat, oil);
  // return totalPrice;
}

getSellerStock = async() =>
{
    this.setState({ dataFlag: true });
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const verificationContract = new ethers.Contract(verificationAddress, Verification.abi, signer);

    // quota data
    const sellerstockData = await verificationContract.getSellerCurrentStock(100);
    this.setState({
      rice: utils.arrayify(sellerstockData['_rice']._hex)[0],
      oil: utils.arrayify(sellerstockData['_oil']._hex)[0],
      wheat: utils.arrayify(sellerstockData['_wheat']._hex)[0],
    });
    console.log(this.state.rice);
    this.setState()
    console.log("seller data --->",sellerstockData);

    const newStock = sellerstockData?.filter((it,i) => i<3)?.map((it,i)=> {
      if(i == 0){
        return{
          header:"Rice",
          description:`${parseInt(it._hex,16)} Kg`
        }
      }
      if(i == 1){
        return{
          header:"Oil",
          description:`${parseInt(it._hex,16)} Lt`
        }
      }
      if(i == 2){
        return{
          header:"Wheat",
          description:`${parseInt(it._hex,16)} Kg`
        }
      }

    })

    this.setState({...this.state,stock:newStock})
}




  renderData() {
    const data = [
      {
        header: 'Seller name',
        description:
          'Ajay Kumar',
      },
      {
        header: 'Address',
        description:
          'Asanghi Basti',
      }
    ];

    return (
    <>
    <h3>Seller details</h3>
    <Card.Group items={data} />
    <h3>Stocks remaining</h3>
    <Card.Group items={this.state.stock} />
    <h3>Add to stocks</h3>

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
      <Button type='submit' primary style={{margin:"15px 0px"}}>Calculate price</Button>
      {this.state.priceFlag ? <h3>Price : {this.state.price}</h3> : <></>}
    </Form>
    </> );
  }

  render() {
    return (
      <Layout>
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Seller Id</label>
          <input placeholder='Seller Id' />
        </Form.Field>
        <Button type='submit' primary>Submit</Button>
      </Form>

      {this.state.dataFlag==true?this.renderData():<></>}
      {this.state.dataFlag && this.state.priceFlag?<Button type='submit' primary style={{margin:"15px 0px"}}>Pay</Button>:<></>}
      </Layout>
    );
  }
}

export default IndianPDS;
