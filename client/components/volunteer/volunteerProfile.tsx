import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import NavBar from '../common/NavBar';
import Footer from '../common/Footer';
import { VolunteerData, VolunteerState } from '../../reducers/volunteer';
import store from '../../reducers/store';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

type VolunteerProfileProps = {
  volunteer: VolunteerState
  getAllVolunteers: () => Promise<Array<VolunteerData>>
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const VolunteerProfile: FC<VolunteerProfileProps> = ({
  volunteer,
  getAllVolunteers,
}: VolunteerProfileProps) => {

  const classes = useStyles();

  useEffect(() => {
    getAllVolunteers();
  }, [volunteer]);

  store.getState().volunteer?.volunteers.forEach(vol => console.log(vol.name))
  volunteer?.volunteers.forEach(vol => console.log(vol.name))

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Volunteer Type</TableCell>
              <TableCell>Member Since</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteer?.volunteers.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>?volunteer type</TableCell>
                <TableCell>?member since</TableCell>
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
