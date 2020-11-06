import React, {Component} from 'react'
import HeroInput from '../HeroInput'
import HeroOutput from '../HeroOutput'
import axios from 'axios'

export default class HeroApp extends Component{
    submitId = (id) => {
        console.log(id)
        const url = 'http://127.0.0.1:5000/debuffOpponentHero'
        axios.post(url, id)
            .then(res => {
                console.log(res.data)
            })
    }
    render(){
        return(
            <div>
                <h2>Opponents' signature heroes</h2>
                <HeroInput submitId = {this.submitId}/>
                <HeroOutput/>
            </div>
        )
    }
}