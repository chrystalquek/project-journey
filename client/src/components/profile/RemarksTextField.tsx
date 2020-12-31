import React, { FC } from 'react';
import { Grid, TextField } from '@material-ui/core';
import DiscardSaveButtons from '@components/profile/DiscardSaveButtons';

// Sub-component for Remarks section

type props = {
  value: string,
  label: string,
  show: boolean,
  onChange(event: any): void,
  onSave(): void,
  onDiscard(): void,
}

const RemarksTextField: FC<props> = ({
  value, onChange, label, show, onSave, onDiscard,
}) => (
  <Grid item container direction="column" spacing={1}>
    <Grid item xs={12}>
      <TextField
        fullWidth
        size="small"
        multiline
        variant="filled"
        color="secondary"
        value={value}
        onChange={onChange}
        label={label}
      />
    </Grid>
    <DiscardSaveButtons
      show={show}
      onSave={onSave}
      onDiscard={onDiscard}
    />
  </Grid>
);

export default RemarksTextField;
