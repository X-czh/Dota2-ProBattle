import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class HeroInput extends Component{
    static propTypes = {
        submitId: PropTypes.func.isRequired
    }

    state = {
        idInput:''
    }

    handleId = (event) => {
        const idInput = event.target.value
        this.setState({idInput})  
    }

    handleInput = (event) => {
        this.props.submitId(this.state.idInput)
        this.setState({idInput:''})
        event.preventDefault()
    }

    render(){
        const {idInput} = this.state
        return(
            <div>
                <h3>Opponent's account id</h3>
                    <input type="text" value={idInput} onChange={this.handleId} />
                <button onClick = {this.handleInput}>Click</button>
            </div>
        )
    }
}