import {
  Badge,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { SignUpData } from "@type/signUp";
import React from "react";

const useStyles = makeStyles((theme) => ({
  selectRole: {
    minWidth: "100%",
    borderRadius: 10,
  },
  badge: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}));

type RoleSelectMenuProps = {
  signUp: SignUpData;
  roleVacancies: {
    [role: string]: number;
  };
  selectedRole: string;
  setSelectedRole: (role: string) => void;
};

export const RoleSelectMenu = (props: RoleSelectMenuProps) => {
  const classes = useStyles();
  const { signUp, roleVacancies, selectedRole, setSelectedRole } = props;

  return (
    <FormControl variant="outlined" className={classes.selectRole}>
      <Select
        value={selectedRole}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedRole(e.target.value)
        }
      >
        <MenuItem value="" disabled>
          Preferences
        </MenuItem>
        {signUp?.preferences.map((preference, index) => (
          <MenuItem
            value={preference}
            disabled={roleVacancies[preference] === 0}
          >
            <Grid container direction="row" justify="flex-end">
              <Grid item xs={11}>
                {`${index + 1}. ${preference}`}
              </Grid>
              <Grid item xs={1}>
                <Badge
                  badgeContent={roleVacancies[preference]}
                  classes={{ badge: classes.badge }}
                />
              </Grid>
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
