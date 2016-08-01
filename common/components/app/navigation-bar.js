import React from 'react';
import Items from '../../constants/items';
import { changeTab } from '../../actions/application';
import { browserHistory } from 'react-router';
import { isLoginOrRedirect } from '../../lib/util';
import items from '../../constants/items';
import styles from './navigation-bar.css';

export default class NavigationBar extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(changeTab(items.TOPIC_TAB));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    let path = nextProps.location.basename;
    if (nextProps.location.pathname && nextProps.location.pathname !== "/") {
      path += nextProps.location.pathname;
    }
    dispatch(changeTab(this.pathToTab(path)));
  }

  handleTouchTap(path, e) {
    e.preventDefault();
    browserHistory.push(path);
    const { dispatch } = this.props;
    const tab = this.pathToTab(path);

    if (tab === Items.NOTIFICATION_TAB || tab === Items.ME_TAB) {
      isLoginOrRedirect();
    }
    dispatch(changeTab(this.pathToTab(path)));
  }

  pathToTab(path) {
    switch (path) {
      case "/notifications":
        return Items.NOTIFICATION_TAB;
      case "/me":
        return Items.ME_TAB;
      default:
        return Items.TOPIC_TAB;
    }
  }

  render() {

    const { selectedTab } = this.props;

    function currentTabClass() {
      if ()

    }

    function tabItemClass(tab) {
      if (tab === selectedTab) {
        return `${styles.tabItemContainer} ${styles.selected}`;
      }

      return styles.tabItemContainer;
    }

    return (
      <div className={styles.tabBar}>
        <div className={tabItemClass(Items.TOPIC_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/")}>
          <span>
            <i className="fa fa-comments" />社区
          </span>
        </div>
        <div className={tabItemClass(Items.NOTIFICATION_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/notifications")}>
          <span>
            <i className="fa fa-bell"/>通知
          </span>
        </div>
        <div className={tabItemClass(Items.ME_TAB)}
             onTouchTap={this.handleTouchTap.bind(this, "/me")}>
          <span>
            <i className="fa fa-user"/>个人
          </span>
        </div>
      </div>
    );
  }
}