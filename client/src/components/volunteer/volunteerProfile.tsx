import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { VolunteerData, VolunteerState } from '../../../redux/reducers/volunteer';

type VolunteerProfileProps = {
  volunteers: VolunteerState
  getAllVolunteers: () => Promise<Array<VolunteerData>>
}

const useStyles = makeStyles({
  table: {
    width: 1200,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
});

const VolunteerProfile: FC<VolunteerProfileProps> = ({
  volunteers,
  getAllVolunteers,
}: VolunteerProfileProps) => {
  const classes = useStyles();

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    getAllVolunteers();
  }, []);

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar />

      <Table className={classes.table}>
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

      <Footer />
    </>
  );
};

export default VolunteerProfile;
