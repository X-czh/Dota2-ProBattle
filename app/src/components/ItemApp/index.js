import React, {Component} from 'react';
import ItemSearch from '../ItemSearch/index'
import ItemList from '../ItemList/index'
import './styles.scss';
import axios from 'axios'

export default class ItemApp extends Component {
  state = {
    heros: '',
    items: []
  }

  itemSearch = (allhero) => {
    let {items} = this.state
    const url = 'http://127.0.0.1:5000/debuffOpponentItem'
    axios.post(url, allhero)
      .then(res => {
        items = Object.values(res.data)
        this.setState({items})
        console.log('response: ',items)
      })
      .catch(err => console.log(err))
  }


  render() {
    const {items} = this.state
    return (
      <div>
        <h2>Recommendation of item</h2>
        <ItemSearch itemSearch = {this.itemSearch}/>
        <ItemList items={items} />
      </div>
    );
  }
}

