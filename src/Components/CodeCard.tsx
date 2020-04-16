import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
  },
  code: {
    fontSize: 20,
    textAlign: "center",
    verticalAlign: "middle",
  },
  expires: {},
}));

type CodeCardProps = {
  code: string;
  expires: Date;
};

const formatDate = new Intl.DateTimeFormat("nl", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format;

const formatTime = new Intl.DateTimeFormat("nl", {
  hour: "numeric",
  minute: "numeric",
}).format;

export default function CodeCard({ code, expires }: CodeCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.code} gutterBottom>
          {code}
        </Typography>
        <Typography className={classes.expires}>
          Verloopt op <strong>{formatDate(expires)}</strong> om{" "}
          <strong>{formatTime(expires)}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
}
