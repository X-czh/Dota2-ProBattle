import React, {Component} from 'react'
import HeroInput from '../HeroInput'
import HeroOutput from '../HeroOutput'
import axios from 'axios'

export default class HeroApp extends Component{
    state = {
        heroes: []
    }
    
    submitId = (id) => {
        let {heroes} = this.state
        console.log(id)
        const url = 'http://ec2-34-224-173-207.compute-1.amazonaws.com:5000/debuffOpponentHero'
        axios.post(url, id)
            .then(res => {
                heroes = res.data
                this.setState({heroes})
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    render(){
        const {heroes} = this.state
        return(
            <div>
                <h2>Opponents' signature heroes</h2>
                <HeroInput submitId = {this.submitId}/>
                <HeroOutput heroes = {heroes}/>
            </div>
        )
    }
}
