import React, { Component } from 'react';
import style from './ChangeEnv.css';

const LIST = [
  {
    label: 'env_01',
  }, {
    label: 'tke_01',
  }, {
    label: 'tke_02',
  }, {
    label: 'tke_03',
  }, {
    label: 'tke_04',
  }, {
    label: 'tke_05',
  }, {
    label: 'tke_06',
  }, {
    label: 'tke_07',
  }];

export default class MainSection extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      choose: '',
    };
  }

  componentWillMount = () => {

  }

  componentDidMount() {
    // this.setForceUpdate();
    chrome.tabs.getSelected(null, (tab) => {
      this.url = tab.url;
      chrome.cookies.get({ url: tab.url, name: 'wpt_env_num' }, (data) => {
        const { value } = data;
        if (value) {
          this.setState({ choose: value });
        }
      });
    });
    // alert();
  }

  url = ''

  handleClick = (data) => {
    chrome.cookies.get({ url: this.url, name: 'wpt_env_num' }, res => console.log(res, 33));
    const domain = this.url.indexOf('localhost') > -1 ? 'localhost' : '.weipaitang.com';
    chrome.cookies.set({
      url: this.url,
      path: '/',
      name: 'wpt_env_num',
      value: data,
      domain,
    });
    this.setState({ choose: data });
  }


  render() {
    const { choose } = this.state;
    return (
      <li className={style.normalItem}>
          环境：
          <select
            onChange={e => this.handleClick(e.target.value)}
            value={choose}
          >
            {
              LIST.map(item => (
                <option value={item.label}>{item.label}</option>
              ))
            }
          </select>
      </li>
    );
  }
}
