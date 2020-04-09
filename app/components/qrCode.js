import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import style from './ChangeEnv.css';

export default class Index extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      choose: '',
    };
  }


  componentDidMount() {
    // this.setForceUpdate();
    chrome.tabs.getSelected(null, (tab) => {
      this.url = tab.url;
      console.log(tab.url, 999);
      chrome.cookies.get({ url: this.url, name: 'wpt_env_num' }, ({ value }) => {
        if (value) {
          this.setState({ choose: value });
        }
      });
    });
    // alert();
  }

  url = ''

  render() {
    return (
      // <section className={style.main}>
      //   <ul className={style.todoList}>
      //     <li style={{ fontSize: 20, lineHeight: '40px' }}>环境:{choose}</li>
      //     {LIST.map(item =>
      //       <li key={item.label}>
      //         <div className={style.view} style={choose === item.label ? { color: 'red' } : {}}>
      //           <button onClick={() => this.handleClick(item)}>
      //             <label>
      //               {item.label}
      //             </label>
      //           </button>
      //         </div>
      //       </li>
      //     )}
      //   </ul>
      // </section>
      <li className={style.normalItem} style={{ height: 60, lineHeight: '60px' }}>
        <QRCode value={this.url} size={60} />
      </li>
    );
  }
}
