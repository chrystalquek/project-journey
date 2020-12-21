import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
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

type VolunteerProfileProps = {
  volunteers: VolunteerState
  getVolunteers: (query: QueryParams) => Promise<void>
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
  const size = 5; // incase can give options to change no of rows per page

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    getVolunteers({ pageNo: 0, size, volunteerType: convertFilterObjectToQueryString(filterVolunteerType) });
  }, []);

  // helpers

  // takes in an enum and returns a string array with all its keys
  // e.g. enum {"a", "b"} => ["a", "b"]
  const getEnumKeys = (enumObj: any) => Object.keys(enumObj).filter(key => !isNaN(Number(enumObj[key])));

  // takes in an enum and returns a filter object containing enum key to boolean pairs, initialized to true
  // e.g. enum {"a", "b"} => {"a": true, "b": true}
  const initializeFilterObject = (enumObj: any) => {
    const keys = getEnumKeys(enumObj);
    const filterObject: any = {};
    keys.forEach(key => filterObject[key] = true);
    return filterObject;
  }

  // takes in a filter object and returns a comma-separated string representation
  // e.g. {"a": true, "b": false, "c": true} => ",a,c"
  const convertFilterObjectToQueryString = (filterObj: any) => Object.keys(filterObj).reduce((a, b) => filterObj[b] ? a + "," + b : a, "");

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }


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
