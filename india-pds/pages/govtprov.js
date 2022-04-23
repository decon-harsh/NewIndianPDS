import React, {Component} from "react";
import { Button, Form, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Layout from "../components/Layout";

class IndianPDS extends Component {
state ={
  dataFlag:false
};

onSubmit=()=>{
  this.setState({dataFlag:true});
}

  renderData() {
    const data = [
      {
        header: 'X cordinate',
        description:
          '22.7758993',
      },
      {
        header: 'Y cordinate',
        description:
          '86.14780226213838',
      },
      {
        header: 'Weight',
        description:
          '100 kg',
      },
    ];

    return (
    <>
    <h3>Current sell</h3>
    <Card.Group items={data} />
    </> );
  }

  render() {
    return (
      <Layout>
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Rfid Tag</label>
          <input placeholder='Rfid Tag' />
        </Form.Field>
        <Button type='submit' primary>Submit</Button>
      </Form>

      {this.state.dataFlag==true?this.renderData():<></>}

      </Layout>
    );
  }
}

export default IndianPDS;
