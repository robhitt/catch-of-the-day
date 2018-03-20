import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base.js';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match
    // reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef) 
      });
    }
    

    // refs in firebase are a reference to the piece of data in the db
    this.ref = base.syncState(`${params.storeId}/fishes `, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // We can do the below to bind 'this' instead of saying
  // this.addFish = this.addFish.bind(this) in the constructor
  addFish = fish => {
    // make copy of fish so we don't have a mutation
    const fishes = {...this.state.fishes};

    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes: fishes // ES 6 can also just say fishes here
    });
  };

  updateFish = (key, updatedFish) => {
    // take a copy of the current state of fishes
    const fishes = { ...this.state.fishes };

    // update the state
    fishes[key] = updatedFish;

    // set this to state
    this.setState({ fishes: fishes });
  }

  deleteFish = (key) => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes }; 
    // 2. update the state
    fishes[key] = null;
    // 3. update State
    this.setState({
      fishes: fishes
    })  
  }

  removeFromOrder = (key) => {
    const order = { ...this.state.order }
    delete order[key];
    this.setState({ order: order });
  }

  loadSampleFishes = () => {
   this.setState({
    fishes: sampleFishes
   });
  }

  addToOrder = (key) => {
    // 1. take a copy of state
    const order = { ...this.state.order };
    
    // 2. add to the order or update the # in or order
    order[key] = order[key] + 1 || 1;
    
    // 3. call set State to update our state object
    this.setState({
      order
    });
  }

  render() {
    return (
      <Fragment>
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh Seafood Market" />
            <ul className="fishes">
              {
                Object.keys(this.state.fishes).map( key => {
                  return (
                    <Fish
                      key={key} 
                      index={key}
                      details={this.state.fishes[key]}
                      addToOrder={this.addToOrder} 
                    />
                  )
                })
              }
            </ul>
          </div>
          <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
          <Inventory 
            addFish={this.addFish} 
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes} 
            fishes={this.state.fishes}
            storeId={this.props.match.params.storeId}
          />
        </div>
      </ Fragment>
    )
  }
}

export default App;