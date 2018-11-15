import React from 'react'
import { Link } from 'gatsby'

import base from './base.css'
import Container from './container'
import Logo from './logo'
import Footer from './footer'
import styles from './layout.module.css'

class Template extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      theme: props.theme || 'light',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setState({ theme: this.props.theme });
    }
  }

  render() {
    const { location, children, clean } = this.props;
    const { theme } = this.state;
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container theme={theme}>
        <main className={styles.wrapper}>
          {!clean && <nav className={styles.navigation}>
            <Logo theme={theme} />
            <ul>
              <li><Link to="/" activeClassName={styles.active}>Motion</Link></li>
              <li><Link to="/still" activeClassName={styles.active}>Still</Link></li>
              <li><Link to="/contact" activeClassName={styles.active}>Contact</Link></li>
            </ul>
          </nav>}
          {children}
          {!clean && <Footer />}
        </main>
      </Container>
    )
  }
}

export default Template
