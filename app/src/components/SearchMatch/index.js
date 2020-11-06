import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'
import { Form, Button } from 'semantic-ui-react';


class SearchMatch extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.searchType);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      matchID: '', 
      accountID: '',
      response: '', 
      searchType: props.searchType 
    }
  }

  componentWillReceiveProps(nextProps) {
    const { searchType } = this.props.searchType
    console.log(nextProps);
     if (nextProps.searchType !== searchType ) {
       this.setState({ searchType: nextProps.searchType })
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
    if (this.state.searchType === "matchID") {
      params = { id: this.state.matchID };
    } else {
      params = { id: this.state.accountID };
    }
    console.log(params)
    axios.post('http://127.0.0.1:5000/' + this.state.searchType, { params })
      .then(response => {
        this.setState({response: response});
        console.log(response);
      });
  }

  render() {
    const { matchID, accountID, response, searchType } = this.state;
    
    if (searchType === 'matchID') {
      return (
        <div className="Search">
          <Form>
            <Form.Field>
              <label>Match ID</label>
              <Form.Input 
                name='matchID'
                value={matchID}
                onChange={this.handleChange} 
              />
            </Form.Field>
            <Button onClick={this.handleSubmit}>Search</Button>
          </Form>
        </div>
      );
    } else if (searchType === 'accountID') {
      return (
        <div className="Search">
          <Form>
            <Form.Field>
              <label>Account ID</label>
              <Form.Input 
                name='accountID'
                value={accountID}
                onChange={this.handleChange} 
              />
            </Form.Field>
            <Button onClick={this.handleSubmit}>Search</Button>
          </Form>
        </div>
      );
    }

    
  }
}

export default SearchMatch;
