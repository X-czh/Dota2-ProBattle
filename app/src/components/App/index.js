import React from 'react';
import Body from '../Body';
import MyHeader from '../MyHeader';
import Footer from '../Footer';
import ItemApp from '../ItemApp';
import HeroApp from '../HeroApp';
import AddMatch from '../AddMatch';
import DeleteMatch from '../DeleteMatch'
import { Dropdown, Header, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


class App extends React.Component {
  componentDidMount() {
    document.title = "Dota2 ProBattle"
  }

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
            <Dropdown text="Match" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item
                text="Add match"
                as = { Link }
                name="addMatch"
                to="/addMatch" />
                <Dropdown.Item
                text="Delete match"
                as = { Link }
                name="deleteMatch"
                to="/deleteMatch" />
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Battle Guide" pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Header>Basic</Dropdown.Header>
                <Dropdown.Item
                text="Opponents' signature heroes"
                as = { Link }
                name="HeroApp"
                to="/HeroApp" />
                <Dropdown.Header>Advanced</Dropdown.Header>
                <Dropdown.Item
                text="Winning Chance Prediction"
                as = { Link }
                name=""
                to="/addMatch" />
              </Dropdown.Menu>
            </Dropdown>
           
          </Menu>
          {/* <Body /> */}

          <Switch>
            <Route path="/" component={ Body } exact />
            <Route path="/item" >
              <ItemApp />
            </Route>
            <Route path="/addMatch">
              <AddMatch />
            </Route>
            <Route path="/deleteMatch">
              <DeleteMatch />
            </Route>
            <Route path="/HeroApp">
              <HeroApp />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
