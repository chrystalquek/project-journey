import Head from '@components/common/Header';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NavBar from '../src/components/common/NavBar';

const Home = () => {
  return (
    <Provider store={store}>
      <Head title="Blessings in a Bag" />
      <NavBar />
      <p>Homepage goes here</p>
      <p>Footer goes here</p>
    </Provider>
  );
}

export default Home;
