import React, {Component} from 'react';
import { Form, Button } from 'semantic-ui-react'
import axios from 'axios'

import './styles.scss';

export default class WinChance extends Component{

    state = {
        radiant_hero1:'',
        radiant_hero2:'',
        radiant_hero3:'',
        radiant_hero4:'',
        radiant_hero5:'',
        dire_hero1:'',
        dire_hero2:'',
        dire_hero3:'',
        dire_hero4:'',
        dire_hero5:'',
        result:''
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleClick = (event) => {
        const heros = this.state
        let {result} = this.state
        const url = 'http://127.0.0.1:5000/winPredict'
        axios.post(url, heros)
            .then(res => {
                result = res.data
                this.setState({
                    radiant_hero1:'',
                    radiant_hero2:'',
                    radiant_hero3:'',
                    radiant_hero4:'',
                    radiant_hero5:'',
                    dire_hero1:'',
                    dire_hero2:'',
                    dire_hero3:'',
                    dire_hero4:'',
                    dire_hero5:'',
                    result
                })
                console.log(res.data)
            })
            .catch(err => console.log(err))
        event.preventDefault()
    }

    render() {
        const {radiant_hero1,radiant_hero2,radiant_hero3,radiant_hero4,radiant_hero5,dire_hero1,dire_hero2,dire_hero3,dire_hero4,dire_hero5,result} = this.state
        return(
            <div className='Main-Wrapper'>
                <div className='MyTeam-Wrapper'>
                        <div className='teamhead'>RADIANT:</div>
                        <Form.Field className='hero-wrapper'>
                            <label className='hero-label'>HERO 1</label>
                            <Form.Input 
                                className='hero-label'
                                name='radiant_hero1'
                                value={radiant_hero1}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field className='hero-wrapper'>
                            <label className='hero-label'>HERO 2</label>
                            <Form.Input 
                                className='hero-label'
                                name='radiant_hero2'
                                value={radiant_hero2}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field className='hero-wrapper'>
                            <label className='hero-label'>HERO 3</label>
                            <Form.Input 
                                className='hero-label'
                                name='radiant_hero3'
                                value={radiant_hero3}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field className='hero-wrapper'>
                            <label className='hero-label'>HERO 4</label>
                            <Form.Input 
                                className='hero-label'
                                name='radiant_hero4'
                                value={radiant_hero4}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field className='hero-wrapper'>
                            <label className='hero-label'>HERO 5</label>
                            <Form.Input 
                                className='hero-label'
                                name='radiant_hero5'
                                value={radiant_hero5}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                </div>
                <div className='Result-Wrapper'>
                    <div>
                        <div className='teamhead2'>Winning Chance</div>
                        <div className='winning-rate-wrapper'>
                            <p className='winning-rate'>{result}</p>
                        </div>
                        <Button className='win-btn' onClick={this.handleClick}>Predict</Button>
                    </div>
                </div>
                <div className='OpponetTeam-Wrapper'>
                    <div className='teamhead'>DIRE:</div>
                    <Form.Field className='hero-wrapper'>
                        <label className='hero-label'>HERO 1</label>
                        <Form.Input 
                            className='hero-label'
                            name='dire_hero1'
                            value={dire_hero1}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='hero-wrapper'>
                        <label className='hero-label'>HERO 2</label>
                        <Form.Input 
                            className='hero-label'
                            name='dire_hero2'
                            value={dire_hero2}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='hero-wrapper'>
                        <label className='hero-label'>HERO 3</label>
                        <Form.Input 
                            className='hero-label'
                            name='dire_hero3'
                            value={dire_hero3}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='hero-wrapper'>
                        <label className='hero-label'>HERO 4</label>
                        <Form.Input 
                            className='hero-label'
                            name='dire_hero4'
                            value={dire_hero4}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field className='hero-wrapper'>
                        <label className='hero-label'>HERO 5</label>
                        <Form.Input 
                            className='hero-label'
                            name='dire_hero5'
                            value={dire_hero5}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                </div>
            </div>
        )
    }
}
