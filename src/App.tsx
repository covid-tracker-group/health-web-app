import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import RequestCode from './Components/RequestCode';
import Copyright from './Components/Copyright';
import CodeCardList from './Components/CodeCardList';
import { generateCodes } from './codes';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function App() {
  const classes = useStyles();
  const [showCodes, setShowCodes] = React.useState<boolean>(false)
  const [codes, setCodes] = React.useState<string[]>([])

  const handleGenerateCodes = () => {
    setCodes(generateCodes())
    setShowCodes(true)
  }

  const handleCloseCodes = () => {
    setCodes([])
    setShowCodes(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <RequestCode onSubmit={handleGenerateCodes} />

        <Dialog
          open={showCodes}
          onClose={handleCloseCodes}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Covid rapportage codes</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              <CodeCardList codes={codes} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCodes} color="primary">
              Sluit
          </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>

    </Container>
  );
}
