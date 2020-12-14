import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { VolunteerData, VolunteerState } from '../../reducers/volunteer';

type VolunteerProfileProps = {
  volunteers: VolunteerState
  getAllVolunteers: () => Promise<Array<VolunteerData>>
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Volunteer Type</TableCell>
              <TableCell>Member Since</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers?.volunteers.map((vol) => (
              <TableRow key={vol.email}>
                <TableCell>{vol.name}</TableCell>
                <TableCell>{vol.volunteerType}</TableCell>
                <TableCell>{new Date(vol.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </>
  );
};

export default VolunteerProfile;
