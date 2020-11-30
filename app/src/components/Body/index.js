import React from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Body extends React.Component{
    render(){
        return(
            <div>
                <section id="section1" data-nav="Section 1" className="your-active-class">
                    <div className="landing__container">
                        <h2 className="nav_title">Opponents’ most commonly used heroes</h2>
                        <p>ProBattle scrapes the recent battle histories of the opponents and suggest which heroes to ban during pick/ban phase based on the query results.</p>
                    </div>
                </section>
                <section id="section1" data-nav="Section 1" className="your-active-class">
                    <div className="landing__container">
                        <h2 className="nav_title">Recommendation of items</h2>
                        <p>From the most recent battle histories of specific hero, ProBattle recommends items with the highest win-rate against the opponents’ team.</p>
                    </div>
                </section>
                <section id="section1" data-nav="Section 1" className="your-active-class">
                    <div className="landing__container">
                        <h2 className="nav_title">Winning Chance Prediction</h2>
                        <p>Our application can predict the winning chance against the opponents’ lineup using machine learning algorithms. More concretely, each hero can be mapped to a vector in a vector space using word2vec, the lineup of a team can thereby be represented with a composition of hero vectors. We can then train a machine learning model on history match data, which takes the representation vectors of the two lineups in the match as input and output the relative win percentage.</p>
                    </div>
                </section><section id="section1" data-nav="Section 1" className="your-active-class">
                    <div className="landing__container">
                        <h2 className="nav_title">Recommendation of Hero Counters</h2>
                        <p>Counter picks of opponents’ heroes can be conveniently stored in a graph DB, where the nodes are heroes, and the edges represent the relative win percentage between the two heroes. We can precompute the relative win percentage between each pair of heroes, and cache the results in a graph DB to accelerate the query time. The content in the graph DB can be updated periodically with recent match data.</p>
                    </div>
                </section>
            </div>
        )
    }
}
export default Body;
