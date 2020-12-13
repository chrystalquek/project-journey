import Container from "@material-ui/core/Container";
import AdminBreadCrumbs from "@components/admin/AdminBreadCrumbs";
import AdminSearchBar from "@components/admin/AdminSearchBar";
import AdminEvents from "@components/admin/AdminEvents";

const AdminHomePage = () => {
  return (
    <Container>
      <AdminBreadCrumbs />
      <AdminSearchBar />
      <div>15 Upcoming Events</div>
      <AdminEvents />
    </Container>
  )
}

export default AdminHomePage;