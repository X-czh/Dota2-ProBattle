import React, {Component} from 'react'
import { Form, Button, Header } from 'semantic-ui-react'
import axios from "axios";

import MyInput from "../MyInput";

import './styles.css'

export default class HeroCounter extends Component{

    state = {
        hero:'',
        results:[]
    }

    handleChange = (event) => {
        const hero = event.target.value
        // console.log(hero,'---1---')
        this.setState({hero})
        // console.log(this.state.hero,'---2---')
    }

    handleSubmit = (event) => {
        const hero = this.state
        let {results} = this.state
        console.log(hero)
        const url = 'http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/counterPickHero'
        axios.post(url, hero)
            .then(res => {
                results = res.data
                this.setState({
                    hero:[],
                    results:results
                })
            })
            .catch(err => console.log(err))
        event.preventDefault()
    }

    render() {
        const {hero, results} = this.state

        return(
            <div className='hero-counter-wrapper'>
                <Form.Field>
                    <h2>Opponent's Hero:</h2>
                    <MyInput
                        value={hero}
                        onChange={this.handleChange}
                        className='op-hero'
                    />
                    <Button className='op-btn' onClick={this.handleSubmit}>Search</Button>
                </Form.Field>
                <h3>Recommendated Heroes and Winning Rate</h3>
                {results.map((result, index) => (<div key={index}>Hero: {result[0]}, Winning Rate: {result[1]}</div>))}
            </div>
        )

    }
}
