import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Header } from 'semantic-ui-react'

export default class HeroInput extends Component{
    static propTypes = {
        submitId: PropTypes.func.isRequired
    }

    state = {
        idInput:''
    }

    handleChange = (event) => {
        const idInput = event.target.value
        console.log(idInput)
        this.setState({idInput})
    }

    handleSubmit = (event) => {
        const id = this.state
        this.props.submitId(id)
        this.setState({idInput:''})
        event.preventDefault()
    }

    render(){
        const {idInput} = this.state
        return(
            <div>
                <Header as='h3'>Opponent's account id</Header>
                <Input value={idInput} onChange={this.handleChange} />
                <Button onClick = {this.handleSubmit}>Click</Button>
            </div>
        )
    }
}
