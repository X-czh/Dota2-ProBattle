import React, {Component} from 'react';
import ItemSearch from '../ItemSearch/index'
import ItemList from '../ItemList/index'
import './styles.scss';
import axios from 'axios'
import { Header } from 'semantic-ui-react'

export default class ItemApp extends Component {
  state = {
    items: []
  }

  itemSearch = (allhero) => {
    let {items} = this.state
    const url = 'http://127.0.0.1:5000/debuffOpponentItem'
    axios.post(url, allhero)
      .then(res => {
        items = res.data
        this.setState({items})
        console.log('response: ',items)
      })
      .catch(err => console.log(err))
  }


  render() {
    const {items} = this.state
    return (
      <div>
        <Header as='h2'>Recommendation of item</Header>
        <ItemSearch itemSearch = {this.itemSearch}/>
        <ItemList items={items} />
      </div>
    );
  }
}

