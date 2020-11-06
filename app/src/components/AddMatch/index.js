import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';
import axios from 'axios'
import { Form, Button, Grid, Header } from 'semantic-ui-react'

class AddMatch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      match_id: '', 
      start_time: '', 
      player1_id: '', 
      player2_id: '',
      player3_id: '',
      player4_id: '',
      player5_id: '',
      player6_id: '',
      player7_id: '',
      player8_id: '',
      player9_id: '',
      player10_id: '',
      response: '' }
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleSubmit() {
    const match = this.state; 
    axios.post('http://127.0.0.1:5000/addMatch', { match })
      .then(response => {
        console.log(response);
        this.setState({ response: response.data})
      });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    // console.log(this.state);
  }

  render() {
    const { match_id, start_time, player1_id, player2_id,
      player3_id, player4_id, player5_id, player6_id,
      player7_id, player8_id, player9_id, player10_id 
    } = this.state; 

    return (
      <div className="Add">
        <Form>
          <Form.Field>
            <label>Match ID</label>
            <Form.Input
              placeholder='1234' 
              name='match_id'
              value={match_id}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Start time</label>
            <Form.Input
              name='start_time' 
              value={start_time}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}><Header as='h3'>Dire</Header></Grid.Column>
              <Grid.Column width={8}><Header as='h3'>Radiant</Header></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player1 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player1_id' 
                    value={player1_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player1 ID</label>
                  <Form.Input 
                    placeholder='1' 
                    name='player6_id' 
                    value={player6_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player2 ID</label>
                  <Form.Input 
                    placeholder='1' 
                    name='player2_id' 
                    value={player2_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player2 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player7_id' 
                    value={player7_id}
                    onChange={this.handleChange}
                  />                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player3 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player3_id' 
                    value={player3_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player3 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player8_id' 
                    value={player8_id}
                    onChange={this.handleChange}
                  />                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player4 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player4_id' 
                    value={player4_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player4 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player9_id' 
                    value={player9_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player5 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player5_id' 
                    value={player5_id}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field>
                  <label>Player5 ID</label>
                  <Form.Input
                    placeholder='1' 
                    name='player10_id' 
                    value={player10_id}
                    onChange={this.handleChange}
                  />                
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Button onClick={ this.handleSubmit }>Add</Button>
        </Form>
        <Header as='h4'>{this.state.response}</Header>
        {/* <Input placeholder='Match ID' onChange={ this.handleChange } /> */}
      </div>
    );
  }
}

export default AddMatch;
