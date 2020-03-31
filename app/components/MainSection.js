import React, { Component } from 'react';
import style from './MainSection.css';

const LIST = [
  {
    label: 'env01',
  }, {
    label: 'tke01',
  }, {
    label: 'tke02',
  }, {
    label: 'tke03',
  }, {
    label: 'tke04',
  }, {
    label: 'tke05',
  }, {
    label: 'tke06',
  }, {
    label: 'tke07',
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
      chrome.cookies.get({ url: this.url, name: 'wpt_env_num' }, ({ value }) => {
        if (value) {
          this.setState({ choose: value });
        }
      });
    });
    // alert();
  }

  url = ''

  setForceUpdate = () => {
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }


  handleClick = (data) => {
    const { label } = data;
    chrome.cookies.get({ url: this.url, name: 'wpt_env_num' }, res => console.log(res, 33));
    chrome.cookies.set({
      url: this.url,
      path: '/',
      name: 'wpt_env_num',
      value: label,
      domain: '.weipaitang.com'
    });
    this.setState({ choose: label });
  }


  render() {
    const { choose } = this.state;
    return (
      <section className={style.main}>
        <ul className={style.todoList}>
          <li style={{ fontSize: 20, lineHeight: '40px' }}>环境:{choose}</li>
          {LIST.map(item =>
            <li key={item.label}>
              <div className={style.view} style={choose === item.label ? { color: 'red' } : {}}>
                <button onClick={() => this.handleClick(item)}>
                  <label>
                    {item.label}
                  </label>
                </button>
              </div>
            </li>
          )}
        </ul>
      </section>
    );
  }
}
