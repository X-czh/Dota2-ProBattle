import React, {Component} from 'react'

export default class HeroOutput extends Component{
    render(){
        return(
            <div>
                <h3>Opponent's most used heros</h3>
                <ul>
                    <li>Hero name, number od matched, win rate</li>
                </ul>
            </div>
        )
    }
}