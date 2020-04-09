import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ChangeEnv from '../components/ChangeEnv';
import QRCode from '../components/qrCode';
import './App.css';

const menu = [{
  label: '切环境',
  value: 'env',
  components: <ChangeEnv />
}, {
  label: '二维码',
  value: 'qrcode',
  components: <QRCode />
}];

@connect()
export default class App extends Component {

  state = {
    chooseIndex: 'env'
  }

  render() {
    const { chooseIndex } = this.state;
    return (
      <div>
        {/* <Header /> */}
        {/* <Menu /> */}
        {/* <ChangeEnv /> */}
        {/* <QRCode /> */}
        <div className="ui grid" style={{ display: 'flex' }}>
          <div className="four wide column">
            <div className="ui vertical fluid tabular menu">
              {menu.map(item => (
                <a className={item.value === chooseIndex ? 'item active' : 'item'} onClick={() => this.setState({ chooseIndex: item.value })}>{item.label}</a>
              ))}
            </div>
          </div>
          <div className="twelve wide stretched column">
            <div className="ui segment">
              {
                menu.map((item) => {
                  if (item.value === chooseIndex) {
                    return item.components;
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
