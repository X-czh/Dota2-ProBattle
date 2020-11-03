import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'

class SearchMatch extends React.Component {
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
      axios.get('http://127.0.0.1:5000/searchMatch')
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
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default SearchMatch;
