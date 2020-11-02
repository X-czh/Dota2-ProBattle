import React from 'react';
import Body from '../Body';
import MyHeader from '../MyHeader';
import Footer from '../Footer';
import SearchItem from '../SearchItem';
import SearchHero from '../SearchHero';
import { Dropdown, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeItem: '' };
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="App">
        <Router>
          <MyHeader />
          <Menu>
            <Menu.Item 
              as={ Link }
              name="item"
              active={activeItem === 'item'}
              to="/item"
              onClick={this.handleItemClick}>
              Items
            </Menu.Item>
            <Menu.Item 
              as={ Link }
              name="hero"
              active={activeItem === 'hero'}
              to="/hero"
              onClick={this.handleItemClick}>
              Hero
            </Menu.Item>
            <Menu.Item 
              as={ Link }
              name="match"
              active={activeItem === 'match'}
              to="/match"
              onClick={this.handleItemClick}>
              Match
            </Menu.Item>
            <Dropdown text="Battle Guide" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Basic</Dropdown.Header>
                <Dropdown.Item>Opponents' signature heroes</Dropdown.Item>
                <Dropdown.Header>Advanced</Dropdown.Header>
                <Dropdown.Item>Winning Chance Prediction</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
           
          </Menu>
          {/* <Body /> */}

          <Switch>
            <Route path="/item" >
              <SearchItem />
            </Route>
            <Route path="/hero" >
              <SearchHero />
            </Route>
            <Route path="/match">
              <Body />
            </Route>
          </Switch>
        </Router>
        
        <Footer />
      </div>
    );
  }
}

export default App;
