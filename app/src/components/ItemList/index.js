import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class ItemList extends Component{
    
    static propTypes = {
        items: PropTypes.array.isRequired,
    }
    
    render(){
        const {items} = this.props
        return(
            <div>
                <h3>Recommended items:</h3>
                <ul>
                    {items.map((item,index) => (<li key={index}>{item}</li>))}
                </ul>
            </div>
            
        ) 
    }
}
