import React, {Component} from 'react';
import PropTypes from 'prop-types'

export default class ItemList extends Component{
    
    static propTypes = {
        items: PropTypes.array.isRequired,
    }
    
    render(){
        const {items} = this.props
        if (items.length == 0){
            return(
                <div>
                    <h3>Recommended items:</h3>
                    <ul>
                        <li>There might be something wrong with your input, please check the heroes you input.</li>
                    </ul>
                </div>
            )
        } else {
            return(
                <div>
                    <h3>Recommended items:</h3>
                    <ul>
            {items.map((item,index) => (<li key={index}>Item:{item.item_name}, aggregated winning rate:{item.aggregated_win_rate}</li>))}
                    </ul>
                </div>
                
            ) 
        }
    }
}
