import React, { Component } from 'react';
import Button from './Button'
import './Top.css';

class Top extends Component {
  render() {
    return (
      <div className="top">
        <Button name="第一个按钮"/>
      </div>
    );
  }
}

export default Top;
