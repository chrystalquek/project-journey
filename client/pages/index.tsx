import Head from '@components/common/Header';
import { StoreState } from '@redux/store';
import { useSelector } from 'react-redux';
import NavBar from '../src/components/common/NavBar';

const Home = () => {
  const userData = useSelector((state: StoreState) => state.user);
  return (
    <>
      <Head title="Blessings in a Bag" />
      <NavBar userData={userData.user} />
      <p>Homepage goes here</p>
      <p>Footer goes here</p>
    </>
  );
};

export default Home;
