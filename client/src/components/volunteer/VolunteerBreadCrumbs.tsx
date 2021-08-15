import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import { FC } from "react";
import { VOLUNTEER_PROFILES_ROUTE } from "@utils/constants/routes";

type VolunteerBreadCrumbsProps = {
  name?: string;
};

const VolunteerBreadCrumbs: FC<VolunteerBreadCrumbsProps> = ({ name }) => (
  <Breadcrumbs separator=">" color="textPrimary" aria-label="breadcrumb">
    <Typography>Volunteer</Typography>
    <Link color="textPrimary" href={VOLUNTEER_PROFILES_ROUTE}>
      Volunteer list
    </Link>
    {name && <Typography>{name}</Typography>}
  </Breadcrumbs>
);

export default VolunteerBreadCrumbs;
