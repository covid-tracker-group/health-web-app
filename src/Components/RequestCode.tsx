import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../logo.svg";
import { Formik, Form, Field, FormikErrors } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  help: {
    marginTop: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type RequestCodeProps = {
  onSubmit: (count: number) => void;
};

interface RequestCodeFormValues {
  count: number;
}

export default function RequestCode({ onSubmit }: RequestCodeProps) {
  const initialValues: RequestCodeFormValues = { count: 10 };
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar} src={logo} />
      <Typography component="h1" variant="h5">
        Covid Positive test rapportage codes
      </Typography>

      <Typography variant="body2" className={classes.help}>
        Gebruik dit formulier om één of meerdere codes aan te vragen waarmee
        gebruikers via een Covid tracking app een positief test resultaat kunnen
        aanmelden.
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            onSubmit(values.count);
          } finally {
            actions.setSubmitting(false);
          }
        }}
        validate={(values) => {
          const errors: FormikErrors<RequestCodeFormValues> = {};
          if (values.count < 1) {
            errors.count = "Er moet tenminste één code worden aangevraagd";
          } else if (values.count > 100) {
            errors.count =
              "Er kunnen maximaal 100 codes tegelijk worden aangevraagd";
          }
          return errors;
        }}
      >
        {(formikBag) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="count"
                  variant="outlined"
                  required
                  fullWidth
                  label="Aantal codes"
                  type="number"
                  inputMode="numeric"
                  inputProps={{
                    pattern: "[0-9]+",
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={formikBag.isSubmitting || formikBag.isValidating}
            >
              Genereer codes
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
