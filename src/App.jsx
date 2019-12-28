import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Loading from './components/Loading'

const Home = React.lazy(() => import('./Home'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>
      <React.Suspense fallback={<Loading />}>
        <Home />
      </React.Suspense>
    </div>
  }
}

export default hot(App);
