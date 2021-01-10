import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  Button,
  capitalize,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { VOLUNTEER_TYPE } from '@type/volunteer';
import RightDrawer from '@components/common/RightDrawer';
import { StoreState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getVolunteersVolunteerProfile } from '@redux/actions/volunteer';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import SearchBar from '@components/common/SearchBar';

// constants
export const rowsPerPage = 10; // for VolunteerProfile, its default is 10

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#069',
    textDecoration: 'underline',
    cursor: 'pointer',
    textTransform: 'none',
    textAlign: 'left'
  },
  rightButton: {
    float: 'right',
    padding: 1,
  },
  border: {
    padding: theme.spacing(2),
  },
}));


const volunteerSortFields = [{ label: "Name", value: "name" }, { label: "Member Since", value: "createdAt" }] // what is "Last Activity"
export type VolunteerSortFieldsType = "name" | "createdAt";

const VolunteerProfile: FC<{}> = ({ }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const userData = useSelector((state: StoreState) => state.user);

  const volunteers = useSelector((state: StoreState) => state.volunteer);

  const volunteerType = volunteers.volunteerProfile.filters.volunteerType; // get filter object
  const name = volunteers.volunteerProfile.search;
  const sort = volunteers.volunteerProfile.sort;

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    dispatch(getVolunteersVolunteerProfile({ volunteerType, name, sort }));
  }, []);


  // filter
  const handleFilterVolunteerTypeChange = (event) => {
    dispatch(getVolunteersVolunteerProfile({
      volunteerType: {
        ...volunteerType,
        [event.target.name]: !volunteerType[event.target.name],
      }, // change boolean for checkbox that changed
      name,
      sort
    }));
  };

  const [openFilter, setOpenFilter] = React.useState(isMobile);

  const filterOptions = (
    <TableContainer>
      <Table>
        <TableRow>
          <TableCell>
            <b>Filter By</b>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            Volunteer Type
          <Button className={classes.rightButton} size="small" onClick={() => setOpenFilter(!openFilter)}>{openFilter ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}</Button>
            {openFilter
              && (
                <FormGroup>
                  {Object.values(VOLUNTEER_TYPE).map((volunteerType) => (
                    <FormControlLabel
                      control={<Checkbox size="small" checked={volunteers.volunteerProfile.filters[volunteerType]} onChange={handleFilterVolunteerTypeChange} name={volunteerType} />}
                      label={<Typography variant="body1">{capitalize(volunteerType)}</Typography>}
                    />
                  ))}
                </FormGroup>
              )}
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>

  );

  // search
  const onSearch = (name: string) => dispatch(getVolunteersVolunteerProfile({ volunteerType, name, sort }));
  const searchBar = <SearchBar setFilterFunction={onSearch}></SearchBar>

  // sort
  const handleSortChange = (event: React.ChangeEvent<{ value: VolunteerSortFieldsType }>) => {
    dispatch(getVolunteersVolunteerProfile({ volunteerType, name, sort: event.target.value as VolunteerSortFieldsType }));
  };

  const sortMenu = <FormControl fullWidth variant="outlined" size="small" margin="dense">
    <InputLabel>Sort By:</InputLabel>
    <Select
      value={volunteers.volunteerProfile.sort}
      onChange={handleSortChange}
    >
      {volunteerSortFields.map(field =>
        <MenuItem value={field.value}>{field.label}</MenuItem>
      )}

    </Select>
  </FormControl>


  // change page
  const handleChangePage = (event, newPage: number) => {
    dispatch(getVolunteersVolunteerProfile({ pageNo: newPage, volunteerType, name, sort }));
  };

  // display table
  const currentPageVolunteers = volunteers.volunteerProfile.ids.map((id) => volunteers.data[id]);

  const volunteerTable = (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Volunteer Type</b></TableCell>
              <TableCell><b>Member Since</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageVolunteers.map((vol) => (
              <TableRow key={vol.email}>
                <TableCell><b>{vol.name}</b></TableCell>
                <TableCell>{vol.volunteerType}</TableCell>
                <TableCell>{vol.createdAt.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={volunteers.volunteerProfile.count}
        rowsPerPage={rowsPerPage}
        page={volunteers.volunteerProfile.pageNo}
        onChangePage={handleChangePage}
      />
    </>
  );

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar userData={userData.user} />

      {!isMobile
        ? (
          <Grid>
            <Grid direction="row" container spacing={6}>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={4}>
                {searchBar}
              </Grid>
              <Grid item xs={3}>
                {sortMenu}
              </Grid>
              <Grid item xs={3}>
              </Grid>
            </Grid>

            <Grid direction="row" container spacing={10}>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={7}>
                {volunteerTable}
              </Grid>
              <Grid item xs={3}>
                {filterOptions}
              </Grid>
            </Grid>
          </Grid>
        )
        : (
          <Grid className={classes.border} direction="column" container spacing={3}>
            <Grid item>
              {searchBar}
            </Grid>
            <Grid item>
              {sortMenu}
            </Grid>
            <Grid item>
              <RightDrawer buttonTitle={<div className={classes.link}>Filter results</div>} content={filterOptions} />
            </Grid>
            <Grid item>
              {volunteerTable}
            </Grid>
          </Grid>
        )}

      <Footer />

    </>
  );
};

export default VolunteerProfile;
