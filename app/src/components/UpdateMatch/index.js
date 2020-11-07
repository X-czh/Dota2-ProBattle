import React from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import { Form, Button, Header } from 'semantic-ui-react';

class UpdateMatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
        MatchID: '',
        startTime: '',
        response: '' 
    };
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleSubmit() {
    console.log('button clicked');
    let params = {
      MatchID: this.state.MatchID,
      startTime: this.state.startTime
    };
    axios.post('http://127.0.0.1:5000/updateMatch', { params })
      .then(response => {
          console.log(response);
          this.setState({ response: response.data })
        });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    // console.log(this.state);
  }


  render() {
    const { MatchID, startTime, response } = this.state;

    return (
      <div className="Update">
        <Form>
          <Form.Field>
            <label>Match ID</label>
            <Form.Input 
              name='MatchID'
              value={MatchID}
              onChange={this.handleChange} 
            />
          </Form.Field>
          <Form.Field>
            <label>Start time</label>
            <Form.Input 
              name='startTime'
              value={startTime}
              onChange={this.handleChange} 
            />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Update</Button>
        </Form>
        <Header as='h4'>{response}</Header>
      </div>
    );
  }
}

export default UpdateMatch;
