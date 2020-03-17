import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  incrementAction,
  decreaseAction,
  loadedAction,
} from '../actions/actions.js';

class Page extends PureComponent {
  render() {
    const { value, incrementAction, decreaseAction, loadedAction } = this.props;
    return (
      <div>
        <h1>{value}</h1>
        <button onClick={loadedAction}>increment</button>
        <button onClick={decreaseAction}>decrease</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  value: state.addReducer.value,
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
  loadedAction: () => dispatch(loadedAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
