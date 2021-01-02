import React, { FC, useEffect } from 'react';
import Head from 'next/head';

import {
  capitalize,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles,
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
import { VolunteerState } from '@redux/reducers/volunteer';
import {Volunteer} from '@type/volunteer';
import { QueryParams } from '@utils/api/request';
import {getEnumValues} from '@utils/helpers/TableOptions';
import RightDrawer from '@components/common/RightDrawer';
import { UserState } from '@redux/reducers/user';
import Footer from '../common/Footer';
import NavBar from '../common/NavBar';

type VolunteerProfileProps = {
  volunteers: VolunteerState
  userData: UserState
  getVolunteers: (query: QueryParams) => Promise<void>
}

// constants
export const rowsPerPage = 10; // for VolunteerProfile, its default is 10

const useStyles = makeStyles((theme) => ({
  link: {
    color: '#069',
    textDecoration: 'underline',
    cursor: 'pointer',
    textTransform: 'none',
  },
  rightButton: {
    float: 'right',
  },
  border: {
    padding: theme.spacing(2),
  },
}));

const VolunteerProfile: FC<VolunteerProfileProps> = ({
  volunteers,
  userData,
  getVolunteers,
}: VolunteerProfileProps) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { volunteerType } = volunteers.meta.filters; // get filter object

  // Only load on initial render to prevent infinite loop
  useEffect(() => {
    getVolunteers({ volunteerType });
  }, []);

  // get array of strings from enum
  const volunteerTypeValues = getEnumValues(Volunteer);

  const handleFilterVolunteerTypeChange = (event) => {
    getVolunteers({
      volunteerType: {
        ...volunteerType,
        [event.target.name]: !volunteerType[event.target.name],
      }, // change boolean for checkbox that changed
    });
  };

  // for opening filter menu
  const [openFilter, setOpenFilter] = React.useState(isMobile);

  const handleChangePage = (event, newPage: number) => {
    getVolunteers({ pageNo: newPage, volunteerType });
  };

  const currentPageVolunteers = volunteers.meta.currentPageIds.map((id) => volunteers.data[id]);

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
                <TableCell>{vol.created_at.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={volunteers.meta.count}
        rowsPerPage={rowsPerPage}
        page={volunteers.meta.pageNo}
        onChangePage={handleChangePage}
      />
    </>
  );

  const filterOptions = (
    <Grid>
      <Typography variant="h4">Filter By</Typography>
      <Divider />
      Volunteer Type
      {' '}
      <IconButton size="small" className={classes.rightButton} onClick={() => setOpenFilter(!openFilter)}>{openFilter ? <RemoveIcon /> : <AddIcon />}</IconButton>
      {openFilter
      && (
      <FormGroup>
        {volunteerTypeValues.map((volunteerType) => (
          <FormControlLabel
            control={<Checkbox checked={volunteers.meta.filters.volunteerType[volunteerType]} onChange={handleFilterVolunteerTypeChange} name={volunteerType} />}
            label={capitalize(volunteerType)}
          />
        ))}
      </FormGroup>
      )}
      <Divider />
    </Grid>
  );

  return (
    <>
      <Head>
        <title>Volunteer Profiles</title>
      </Head>
      <NavBar userData={userData.user} />

      {!isMobile
        ? (
          <Grid container direction="row" spacing={3} justify="center">
            <Grid item xs={7}>
              {volunteerTable}
            </Grid>
            <Grid item xs={3}>
              {filterOptions}
            </Grid>
          </Grid>
        )
        : (
          <>
            <RightDrawer buttonTitle={<div className={classes.link}>Filter results</div>} content={filterOptions} />
            <Grid className={classes.border}>{volunteerTable}</Grid>
          </>
        )}

      <Footer />

    </>
  );
};

export default VolunteerProfile;
