import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { name: '', response: '' }
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleClick() {
      console.log('button clicked');
      axios.get('http://127.0.0.1:5000/addHero')
        .then(response => console.log(response));
  }

  handleChange(event) {
      const { value } = event.target;
      console.log(value);
      this.setState({ name: value })
  }

  render() {
    return (
      <div className="Search">
        <input className="Search-input" onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add hero</button>
      </div>
    );
  }
}

export default Search;
