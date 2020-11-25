import React, {Component} from 'react'
import { Form, Button, Header } from 'semantic-ui-react'

import MyInput from "../MyInput";
import axios from "axios";

export default class HeroCounter extends Component{

    state = {
        hero:'',
        results:[]
    }

    handleChange = (event) => {
        const hero = event.target.value
        this.setState({hero})
    }

    handleSubmit = (event) => {
        const {hero} = this.state
        const url = 'http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/winPredict'
        axios.post(url, hero)
            .then(res => {
                result = res.data
                this.setState({
                    hero:'',
                    results:[]
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
        event.preventDefault()
    }

    render() {
        const {hero, results} = this.state
        return(
            <div>
                <Form.Field>
                        <label>Opponent's Hero:</label>
                        <MyInput
                            name='hero'
                            value={hero}
                            onChange={this.handleChange}
                        />
                </Form.Field>
                <Button onClick={this.handleSubmit}>Search</Button>
                <ul>
                    <h3>Recommendated Heroes and Winning Rate</h3>
                    {results.map((result, index) => (<li key={index}>Hero: {result[0]}, Winning Rate: {result[1]}</li>))}
                </ul>
            </div>
        )
    }
}