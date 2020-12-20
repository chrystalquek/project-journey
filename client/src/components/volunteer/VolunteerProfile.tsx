import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { VolunteerState } from '@redux/reducers/volunteer';
import { VOLUNTEER_TYPE } from 'types/volunteer';

type VolunteerProfileProps = {
  volunteers: VolunteerState
  getVolunteers: (pageNo: number, size: number, volunteerType: string) => Promise<void>
}

// const useStyles = makeStyles(theme => ({
//   table: {
//     margin: theme.spacing(10),
//   },
// }));

const VolunteerProfile: FC<VolunteerProfileProps> = ({
  volunteers,
  getVolunteers
}: VolunteerProfileProps) => {
  // const classes = useStyles();

  // constants
  const size = 5;

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    getVolunteers(0, size, filterVolunteerTypeToString(filterVolunteerType));
  }, []);

  // for filtering by volunteer type
  const [filterVolunteerType, setFilterVolunteerType] = React.useState({ "ad-hoc": true, "committed": true, "lead": true, "admin": true });

  const handleFilterVolunteerTypeChange = (event) => {
    setFilterVolunteerType({
      ...filterVolunteerType,
      [event.target.name]: event.target.checked
    });
    getVolunteers(0, size, filterVolunteerTypeToString({
      ...filterVolunteerType,
      [event.target.name]: event.target.checked
    }));
  };

  const filterVolunteerTypeToString = (filterVolunteerType) => {
    let result = ""
    Object.keys(filterVolunteerType).forEach(key => {
      if (filterVolunteerType[key]) {
        result += "," + key
      }
    })
    return result;
  }

  // for opening filter menu
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleToggle = () => {
    setOpenFilter(!openFilter);
  };


  const handleChangePage = (event, newPage: number) => {
    getVolunteers(newPage, size, filterVolunteerTypeToString(filterVolunteerType));
  };

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar />

      <Grid container direction="row" spacing={3} xs={10}>
        <Grid item xs={8}>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Volunteer Type</b></TableCell>
                  <TableCell><b>Member Since</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {volunteers?.volunteers.map((vol) => (
                  <TableRow key={vol.email}>
                    <TableCell><b>{vol.name}</b></TableCell>
                    <TableCell>{vol.volunteerType}</TableCell>
                    <TableCell>{new Date(vol.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={volunteers.count}
            rowsPerPage={size}
            page={volunteers.page}
            onChangePage={handleChangePage}
          />
        </Grid>

        <Grid item xs={2} >
          <Typography>Filter by</Typography>
          <Typography>Volunteer Type <IconButton onClick={() => handleToggle()}>{openFilter ? <RemoveIcon /> : <AddIcon />}</IconButton></Typography>
          {openFilter &&
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filterVolunteerType["ad-hoc"]} onChange={handleFilterVolunteerTypeChange} name="ad-hoc" />}
                label="Ad-hoc"
              />
              <FormControlLabel
                control={<Checkbox checked={filterVolunteerType["committed"]} onChange={handleFilterVolunteerTypeChange} name="committed" />}
                label="Committed"
              />
              <FormControlLabel
                control={<Checkbox checked={filterVolunteerType["lead"]} onChange={handleFilterVolunteerTypeChange} name="lead" />}
                label="Lead"
              />
              <FormControlLabel
                control={<Checkbox checked={filterVolunteerType["admin"]} onChange={handleFilterVolunteerTypeChange} name="admin" />}
                label="Admin"
              />
            </FormGroup>
          }

        </Grid>
      </Grid>

      <Footer />

    </>
  );
};

export default VolunteerProfile;
