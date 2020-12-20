import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
} from '@material-ui/core';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { VolunteerState } from '@redux/reducers/volunteer';

type VolunteerProfileProps = {
  volunteers: VolunteerState
  getVolunteers: (pageNo: number, size: number) => Promise<void>
}

const useStyles = makeStyles(theme => ({
  table: {
    margin: theme.spacing(10),
  },
}));

const VolunteerProfile: FC<VolunteerProfileProps> = ({
  volunteers,
  getVolunteers
}: VolunteerProfileProps) => {
  const classes = useStyles();

  const size = 5;

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    getVolunteers(0, size);
  }, []);

  const handleChangePage = (event, newPage: number) => {
    getVolunteers(newPage, size);
  };

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar />

      <TableContainer className={classes.table}>
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

      <Footer />

    </>
  );
};

export default VolunteerProfile;
