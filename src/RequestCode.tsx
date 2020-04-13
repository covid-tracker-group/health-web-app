import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  subtle: {
    color: theme.palette.info.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type RequestCodeProps = {
  onSubmit: (count: number) => void;
};

export default function RequestCode({onSubmit}: RequestCodeProps) {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Covid Positive test rapportage codes
      </Typography>

      <Typography component="p" className={classes.subtle}>
        Gebruik dit formulier om één of meerdere codes aan te vagen waarmee gebruikers
        via een Covid tracking app een positief test resultaat kunnen aanmelden.
      </Typography>

      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="count"
              label="Aantal codes"
              name="count"
              type="number"
              inputMode="numeric"
              inputProps={{
                min: "1",
                pattern: "[0-9]+",
              }}
              defaultValue="1"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Genereer codes
        </Button>
      </form>
    </>
  );
}