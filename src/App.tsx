import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import RequestCode from "./Components/RequestCode";
import Copyright from "./Components/Copyright";
import CodeCardList from "./Components/CodeCardList";
import { generateCodes } from "./codes";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function App() {
  const classes = useStyles();
  const [expires, setExpires] = useState<Date | null>(null);
  const [showCodes, setShowCodes] = useState<boolean>(false);
  const [codes, setCodes] = useState<string[]>([]);

  const handleGenerateCodes = async (count: number) => {
    const { expires, codes } = await generateCodes(count);
    setCodes(codes);
    setExpires(expires);
    setShowCodes(true);
  };

  const handleCloseCodes = () => {
    setCodes([]);
    setShowCodes(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <RequestCode onSubmit={handleGenerateCodes} />
        </div>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      <Dialog
        open={showCodes}
        onClose={handleCloseCodes}
        maxWidth="lg"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Covid rapportage codes
        </DialogTitle>
        <DialogContent dividers={true}>
          <p id="scrolldialog-description">
            Deze codes kunnen aan patiënten worden gegeven als ze een positieve
            Covid-19 test hebben ontvangen. Let er op dat deze codes{" "}
            <strong>beperkt houdbaar</strong> zijn.
          </p>
          <CodeCardList expires={expires!} codes={codes} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCodes} color="primary">
            Sluit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
