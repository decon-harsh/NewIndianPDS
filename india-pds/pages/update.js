import React, {Component} from "react";
import { Button, Form, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Layout from "../components/Layout";

class IndianPDS extends Component {
state ={
  dataFlag:false,
  priceFlag:false,
  price:0
};

onSubmit=()=>{
  this.setState({dataFlag:true});
}

calculate=()=>{
  this.setState({priceFlag:true,price:100});
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
    const stock = [
      {
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
      },
    ];

    return (
    <>
    <h3>Seller details</h3>
    <Card.Group items={data} />
    <h3>Stocks remaining</h3>
    <Card.Group items={stock} />
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
