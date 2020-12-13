import Head from '@components/common/Header';
import AdminHomePage from "@components/admin/AdminHomePage";
import NavBar from '@components/common/NavBar';

const AdminHome = () => {
  return (
    <>
      <Head title="Blessings in a Bag"></Head>
      <NavBar />
      <AdminHomePage />
    </>
  )
}

export default AdminHome;