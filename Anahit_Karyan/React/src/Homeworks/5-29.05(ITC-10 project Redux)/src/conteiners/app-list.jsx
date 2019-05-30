import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class AppList extends Component {
  render () {
    return (
      <ol>
        <li>1</li>
        <li>2</li>
      </ol>
    );
  }
}

function mapStateToProps (state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(AppList);
