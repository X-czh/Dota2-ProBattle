import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios';
import { Form, Button, Item, Loader, Message } from 'semantic-ui-react';


class SearchMatch extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.searchType);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      MatchID: '', 
      AccountID: '',
      response: [], 
      afterSearch: false,
      active: false,
      searchType: props.searchType 
    }
  }

  componentWillReceiveProps(nextProps) {
    const { searchType } = this.props.searchType
    console.log(nextProps);
    if (nextProps.searchType !== searchType ) {
      this.setState({ 
        searchType: nextProps.searchType,
        active: false,
        afterSearch: false
      })
    }
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    // console.log(this.state);
  }

  handleSubmit() {
    let params = {};
    if (this.state.searchType === "MatchID") {
      params = { id: this.state.MatchID };
    } else {
      params = { id: this.state.AccountID };
    }
    console.log(params)
    this.setState({active: true})
    axios.post('http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/searchMatchBy' + this.state.searchType, { params })
      .then(response => {
        this.setState({
          response: response.data, 
          active: false,
          afterSearch: true
        });
        console.log(response.data);
      });
  }

  render() {
    const { MatchID, AccountID, response, afterSearch, searchType } = this.state;
    
    let IDType = searchType.substring(0, searchType.length-2);
    let value_ = '';
    if (searchType === "AccountID") {
      value_ = AccountID;
    } else {
      value_ = MatchID;
    }

    return (
      <div className="Search">
        <Form>
          <Form.Field>
            <label>{IDType} ID</label>
            <Form.Input 
              name={searchType}
              value={value_}
              onChange={this.handleChange} 
            />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Search</Button>
        </Form>
        <Loader active={this.state.active}>Loading</Loader>
        <Item.Group divided>
          {afterSearch && response.length === 0 ? 
            <Message>
              <Message.Header>No match found</Message.Header>
            </Message> : <div></div>} 
          {this.state.response.map((match) => (
            <Item>
              <Item.Content>
                <Item.Header as='h4'>{match.match_id}</Item.Header>
                <Item.Description>
                  <p>{match.start_time}</p>
                </Item.Description>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </div>
    );

  
  }
}

export default SearchMatch;
