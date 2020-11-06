import React, {Component} from 'react';
// import PropTypes from "prop-types";
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
    const url = 'http://127.0.0.1:5000/debuffOpponentItem'
    axios.post(url, allhero)
      .then(res => {
        console.log('response: ',res)
      })
      .catch(err => console.log(err))

  //   this.state.heros = allhero
  }

  render() {
    return (
      <div>
        <h2>Recommendation of item</h2>
        <ItemSearch itemSearch={this.itemSearch}/>
        {/* <ItemList /> */}
      </div>
    );
  }
}

