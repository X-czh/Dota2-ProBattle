import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'

class SearchItem extends React.Component {
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
      axios.get('http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/addItem')
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

export default SearchItem;
