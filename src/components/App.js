import React, { Fragment } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

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
                  return <Fish
                            key={key} 
                            index={key}
                            details={this.state.fishes[key]}
                            addToOrder={this.addToOrder} 
                          />
                })
              }
            </ul>
          </div>
          <Order fishes={this.state.fishes} order={this.state.order} />
          <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
        </div>
      </ Fragment>
    )
  }
}

export default App;