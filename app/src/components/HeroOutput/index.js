import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class HeroOutput extends Component{

    static propTypes = {
        heroes: PropTypes.array.isRequired,
    }

    render(){
        const {heroes} = this.props
        return(
            <div>
                <h3>Opponent's most used heroes</h3>
                <ul>
                    {heroes.map((hero,index) => (<li key={index}>`Hero: ${hero.hero_name}, number of games: ${hero.num_games}, winning rate: ${hero.win_rate}`</li>))}
                </ul>
            </div> 
        )
    }
}
