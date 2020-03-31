import React, { Component, PropTypes } from 'react';
import style from './TodoItem.css';

export default class TodoItem extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    chrome.tabs.getSelected(null, (tab) => { this.url = tab.url; });
  }

  url = ''

  handleClick = (data) => {
    const { value } = data;
    chrome.cookies.set({
      url: this.url,
      name: 'wpt_env_num',
      value: `env_0${value}`,
      domain: '.weipaitang.com'
    });
  }


  // cookie 切换
  cookie = {
    get(name) {
      const cookieObj = {};
      if (document.cookie.length !== 0) {
        document.cookie.split(';').map((item) => {
          const key = item.split('=')[0].trim();
          let value;
          try {
            value = JSON.parse(item.split('=')[1]);
          } catch (e) {
            value = item.split('=')[1];
          }
          cookieObj[key] = value;
        });
      }
      return name ? cookieObj[name] : cookieObj;
    },
    set(name, value, config = { path: '/' }) {
      const newConfig = Object.assign({ [name]: value }, config);
      const configStr = [...Object.keys(newConfig)].map(key => `${key}=${newConfig[key]}`).join(' ;');
      document.cookie = configStr;
    },
    remove(name) {
      this.set(name, '', { expires: new Date(0), path: '/' });
    },
    clear() {
      const cookieObj = this.get();
      Object.keys(cookieObj).map(cookieItem => this.remove(cookieItem));
    }
  }

  render() {
    const { data } = this.props;
    return (
      <li >
        <div className={style.view}>
          <button onClick={() => this.handleClick(data)}>
            <label>
              {data.label}
            </label>
          </button>
        </div>
      </li>
    );
  }
}

