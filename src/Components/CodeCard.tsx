import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
  },
  code: {
    fontSize: 20,
    textAlign: "center",
    verticalAlign: "middle",
  },
}));

type CodeCardProps = {
  code: string;
};

export default function CodeCard({ code }: CodeCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.code} gutterBottom>
          {code}
        </Typography>
      </CardContent>
    </Card>
  )
}
