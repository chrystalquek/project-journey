import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DiscardSaveButtons from '@components/profile/DiscardSaveButtons';

export default function RemarksTextField({
  value, onChange, label, show, onSave, onDiscard,
}) {
  return (
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
}
