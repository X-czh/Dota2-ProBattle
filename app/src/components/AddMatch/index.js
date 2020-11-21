import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'
import { Form, Button, Loader, Header } from 'semantic-ui-react'

class AddMatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      MatchID: '', 
      AccountID: '',
      response: '',
      active: false,
      addType: props.addType
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const { addType } = this.props.addType;
    if (nextProps.addType !== addType ) {
      this.setState({ 
        addType: nextProps.addType,
        active: false
      })
    }
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleSubmit() {
    let params = {};
    if (this.state.addType === "MatchID") {
      params = { id: this.state.MatchID };
    } else {
      params = { id: this.state.AccountID };
    }
    console.log(params);
    this.setState({ active: true });
    axios.post('http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/addMatchBy' + this.state.addType, { params })
      .then(response => {
        console.log(response);
        this.setState({ 
          response: response.data,
          active: false
        })
      });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    // console.log(this.state);
  }

  render() {
    const { MatchID, AccountID, response, active, addType } = this.state; 
    
    let IDType = addType.substring(0, addType.length-2);
    let value_ = '';
    if (addType === "AccountID") {
      value_ = AccountID;
    } else {
      value_ = MatchID;
    }

    return (
      <div className="Add">
        <Form>
          <Form.Field>
            <label>{IDType} ID</label>
            <Form.Input 
              name={addType}
              value={value_}
              onChange={this.handleChange} 
            />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Add</Button>
        </Form>
        <Loader active={active}>Loading</Loader>
        <Header as='h4'>{response}</Header>
      </div>
    );
  }
}

export default AddMatch;
