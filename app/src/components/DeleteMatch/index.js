import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'
import { Input, Button, Header } from 'semantic-ui-react'

class DeleteMatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { id: '', response: '' }
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleSubmit() {
    const match = {
      id: this.state.id
    }
    axios.post('http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/deleteMatch', { match })
      .then(response => {
        this.setState({response: response});
        console.log(response);
      });
  }

  handleChange(event) {
      const { value } = event.target;
      console.log(value);
      this.setState({ id: value })
  }

  render() {
    return (
      <div className="Delete">
        <Input placeholder='Match ID' onChange={ this.handleChange } />
        <Button onClick={ this.handleSubmit }>Delete</Button>
        <Header as='h4'>{this.state.response.data}</Header>
      </div>
    );
  }
}

export default DeleteMatch;
