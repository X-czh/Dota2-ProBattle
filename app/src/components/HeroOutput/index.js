import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class HeroOutput extends Component{

    static propTypes = {
        heroes: PropTypes.array.isRequired,
    }

    render(){
        const {heroes} = this.props
        if(heroes.length == 0){
            return(
                <div>
                    <h3>Opponent's most used heroes</h3>
                    <ul>
                       
                    </ul>
                </div> 
            )
        } else if (heroes[0] === 0) {
                <div>
                    <h3>Opponent's most used heroes</h3>
                    <ul>
                         <li>Invalid account ID or no recent matches</li>
                    </ul>
                </div> 
        } else {
            return(
                <div>
                    <h3>Opponent's most used heroes</h3>
                    <ul>
                        {heroes.map( (hero,index) => (
                            <li key={index}>
                                Hero: {hero.hero_name}, number of games: {hero.num_games}, winning rate: {hero.win_rate}
                            </li>)
                            )
                        }
                        <li>{}</li>
                    </ul>
                </div> 
            )
        }
    }
}
