import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
        this.setState({
            myhero:'',
            opponenthero1:'',
            opponenthero2:'',
            opponenthero3:'',
            opponenthero4:'',
            opponenthero5:'',
        })
        event.preventDefault()
    }

    handleMyHeroChange = (event) => {
        const myhero = event.target.value
        this.setState({myhero})
    }
    handleOpponentHeroChange1 = (event) => {
        const opponenthero1 = event.target.value
        this.setState({opponenthero1})
    }
    handleOpponentHeroChange2 = (event) => {
        const opponenthero2 = event.target.value
        this.setState({opponenthero2})
    }
    handleOpponentHeroChange3 = (event) => {
        const opponenthero3 = event.target.value
        this.setState({opponenthero3})
    }
    handleOpponentHeroChange4 = (event) => {
        const opponenthero4 = event.target.value
        this.setState({opponenthero4})
    }
    handleOpponentHeroChange5 = (event) => {
        const opponenthero5 = event.target.value
        this.setState({opponenthero5})
    }

    render(){
        const {myhero, opponenthero1, opponenthero2, opponenthero3, opponenthero4, opponenthero5} = this.state
        return(
            <form>
                <div>
                    <label htmlFor="">My Hero:</label>
                    <input type="text" placeholder='Please input your hero:' value={myhero} onChange={this.handleMyHeroChange}/>
                </div>
                <div>
                    <label htmlFor="">Opponent's Heros:</label>
                    <input type="text" placeholder="Please input opponent's hero" value={opponenthero1} onChange={this.handleOpponentHeroChange1}/>
                    <input type="text" placeholder="Please input opponent's hero" value={opponenthero2} onChange={this.handleOpponentHeroChange2}/>
                    <input type="text" placeholder="Please input opponent's hero" value={opponenthero3} onChange={this.handleOpponentHeroChange3}/>
                    <input type="text" placeholder="Please input opponent's hero" value={opponenthero4} onChange={this.handleOpponentHeroChange4}/>
                    <input type="text" placeholder="Please input opponent's hero" value={opponenthero5} onChange={this.handleOpponentHeroChange5}/>
                </div>
                <div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </form>
        )
    }
}