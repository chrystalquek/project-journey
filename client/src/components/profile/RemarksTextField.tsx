import React, { FC } from "react";
import { Grid, TextField } from "@material-ui/core";
import DiscardSaveButtons from "@components/profile/DiscardSaveButtons";

// Sub-component for Remarks section

type props = {
  value: string;
  label: string;
  show: boolean;
  onChange: (event: any) => void;
  onSave: () => void;
  onDiscard: () => void;
  disabled?: boolean;
};

const RemarksTextField: FC<props> = ({
  value,
  onChange,
  label,
  show,
  onSave,
  onDiscard,
  disabled = true,
}) => (
  <Grid item container direction="column" spacing={1}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        size="small"
        multiline
        variant="filled"
        value={value}
        onChange={onChange}
        label={label}
        disabled={disabled}
      />
    </Grid>
    <DiscardSaveButtons show={show} onSave={onSave} onDiscard={onDiscard} />
  </Grid>
);

export default RemarksTextField;
