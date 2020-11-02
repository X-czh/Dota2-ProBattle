import React from 'react';
import './styles.scss';
import { Header } from "semantic-ui-react"

class MyHeader extends React.Component {
  render() {
    return (
      <div  className='MyHeader'>
        <Header as='h1' textAlign='center'>
          Dota 2 Pro Battle
        </Header>
      </div>
    );
  }
}

export default MyHeader;
