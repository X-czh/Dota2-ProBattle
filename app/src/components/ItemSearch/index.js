import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Header } from 'semantic-ui-react'

import MyInput from "../MyInput";

export default class ItemSearch extends Component{

    static propTypes = {
        itemSearch: PropTypes.func.isRequired
    }
    
    state = {
        myhero:'',
        opponenthero1:'',
        opponenthero2:'',
        opponenthero3:'',
        opponenthero4:'',
        opponenthero5:'',
    }

    handleSubmit = (event) => {
        const heros = this.state
        this.props.itemSearch({heros})
        event.preventDefault()
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
        // console.log(this.state);
    }

    render(){
        const {myhero, opponenthero1, opponenthero2, opponenthero3, opponenthero4, opponenthero5} = this.state
        return(
            <div>
                <Form>
                    <Form.Field>
                        <label>My Hero:</label>
                        <MyInput
                            name='myhero'
                            value={myhero}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Opponent Hero 1</label>
                        <MyInput
                            name='opponenthero1'
                            value={opponenthero1}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Opponent Hero 2</label>
                        <MyInput
                            name='opponenthero2'
                            value={opponenthero2}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Opponent Hero 3</label>
                        <MyInput
                            name='opponenthero3'
                            value={opponenthero3}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Opponent Hero 4</label>
                        <MyInput
                            name='opponenthero4'
                            value={opponenthero4}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Opponent Hero 5</label>
                        <MyInput
                            name='opponenthero5'
                            value={opponenthero5}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Button onClick={this.handleSubmit}>Search</Button>
                </Form>
            </div>
        )
    }
}
