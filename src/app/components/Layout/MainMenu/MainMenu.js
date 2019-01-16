import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import { Link } from 'components/common';

import url from 'routes/urls';

import styles from './MainMenu.scss';


class MainMenu extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    opened: false,
    showContent: false,
  }

  componentDidMount() {
    this.linksNodeEl.addEventListener('click', ({ target }) => {
      if (target.tagName === 'A' || target.parentNode.tagName === 'A') this.toggleMenu();
    })
  }

  toggleMenu = () => {
    const { opened } = this.state;

    this.setState({ opened: !opened });
    
    if (!opened) setTimeout(() => {
      this.setState({ showContent: true });
    }, 250);
    else this.setState({ showContent: false });
  }

  render() {
    const {
      opened,
      showContent,
    } = this.state;

    return (
      <Fragment>
        <div className={cx(styles.menuControl, {
          [styles.menuControlActive]: opened,
        })} onClick={this.toggleMenu}>
          <i className={styles.menuSticky} />
          <i className={styles.menuSticky} />
          <i className={styles.menuSticky} />
        </div>
        <div className={cx(styles.menuWrapper, {
          [styles.menuWrapperActive]: opened,
        })}>
          <div className={cx(styles.menuContent, {
            [styles.menuContentActive]: showContent,
          })}>
            <div className={styles.menuTitle}>Credit club - Control panel</div>
            <div className={styles.menuListLinks} ref={(el) => this.linksNodeEl = el}>
              <Link
                title='Мониторинг'
                className={styles.link}
                to={url.monitoring.path}
                icon="zmdi zmdi-chart-donut"
              />
              <Link
                to={url.calls.path}
                className={styles.link}
                title='Звонки и телефония'
                icon="zmdi zmdi-phone-in-talk"
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MainMenu;