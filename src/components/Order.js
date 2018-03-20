import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    
    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 500, exit: 500 }
    };
    // Make sure the fish is loaded before we continue
    if (!fish) {
      return null;
    }

    const count = this.props.order[key];
    const isAvailable = fish.status === 'available';
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );
    }
    
    return (
      <CSSTransition  {...transitionOptions}>
        <li key={key}>
        <span>
          <TransitionGroup component="span" className="count">
          <CSSTransition
            classNames="count"
            key={count}
            timeout={{ enter: 500, exit: 500}}
          >
              <span>{count} </span>
            </CSSTransition>
          </TransitionGroup>
          lbs
          <span>{fish.name}</span>
          {formatPrice(count * fish.price)}
          <span><button onClick={() => this.props.removeFromOrder(key)}>
            &times;
          </button></span>
        </span>
        </li>
        </CSSTransition>
      )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price
      } else {
        return prevTotal;
      }
    }, 0);

    return (
      <Fragment>
        <div className="order-wrap">
          <h2>Order</h2>
          <TransitionGroup component="ul" className="order">
            {
              orderIds.map((key) => {
                return (
                  this.renderOrder(key)
                )
              })
            }
          </TransitionGroup>
          <div className="total">
            Total:
            <strong>{formatPrice(total)}</strong>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Order;