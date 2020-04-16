import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../logo.svg";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldProps,
  FormikErrors,
} from "formik";

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
  isLoading: boolean;
};

interface RequestCodeFormValues {
  count: number;
}

export default function RequestCode({ isLoading, onSubmit }: RequestCodeProps) {
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
        onSubmit={(values, actions) => {
          onSubmit(values.count);
          actions.setSubmitting(false);
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
                  name="count"
                  render={({
                    field,
                    meta,
                  }: FieldProps<RequestCodeFormValues>) => (
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="count"
                      label="Aantal codes"
                      type="number"
                      inputMode="numeric"
                      inputProps={{
                        min: "1",
                        pattern: "[0-9]+",
                      }}
                      error={!!(meta.touched && meta.error)}
                      helperText={<ErrorMessage name="count" />}
                      {...field}
                    />
                  )}
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
