import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  capitalize,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { VolunteerState } from '@redux/reducers/volunteer';
import { VOLUNTEER_TYPE } from 'types/volunteer';
import { QueryParams } from 'api/request';
import { convertFilterObjectToQueryString, getEnumKeys, initializeFilterObject } from '@utils/helpers/TableOptions';

type VolunteerProfileProps = {
  volunteers: VolunteerState
  getVolunteers: (query: QueryParams) => Promise<void>
}

const VolunteerProfile: FC<VolunteerProfileProps> = ({
  volunteers,
  getVolunteers
}: VolunteerProfileProps) => {

  // constants
  const size = 10;

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    getVolunteers({ pageNo: 0, size, volunteerType: convertFilterObjectToQueryString(filterVolunteerType) });
  }, []);

  // get array of strings from enum
  const volunteerTypeValues = getEnumKeys(VOLUNTEER_TYPE);

  // for filtering by volunteer type
  const [filterVolunteerType, setFilterVolunteerType] = React.useState(initializeFilterObject(VOLUNTEER_TYPE));

  const handleFilterVolunteerTypeChange = (event) => {
    setFilterVolunteerType({
      ...filterVolunteerType,
      [event.target.name]: event.target.checked
    });
    getVolunteers({
      pageNo: 0, size, volunteerType: convertFilterObjectToQueryString({
        ...filterVolunteerType,
        [event.target.name]: event.target.checked
      })
    });
  };

  // for opening filter menu
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleToggle = () => {
    setOpenFilter(!openFilter);
  };


  const handleChangePage = (event, newPage: number) => {
    getVolunteers({ pageNo: newPage, size, volunteerType: convertFilterObjectToQueryString(filterVolunteerType) });
  };

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar />

      <Grid container direction="row" spacing={3} justify="center">
        <Grid item xs={7}>
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
                    <TableCell>{vol.created_at.toLocaleDateString()}</TableCell>
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

        <Grid item xs={3} >
          <Typography>Filter by</Typography>
          <Typography>Volunteer Type <IconButton onClick={() => handleToggle()}>{openFilter ? <RemoveIcon /> : <AddIcon />}</IconButton></Typography>
          {openFilter &&
            <FormGroup>
              {volunteerTypeValues.map(volunteerType => <FormControlLabel
                control={<Checkbox checked={filterVolunteerType[volunteerType]} onChange={handleFilterVolunteerTypeChange} name={volunteerType} />}
                label={capitalize(volunteerType)}
              />)}
            </FormGroup>
          }

        </Grid>
      </Grid>

      <Footer />

    </>
  );
};

export default VolunteerProfile;
