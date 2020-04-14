import React from 'react';
import Grid from '@material-ui/core/Grid';
import CodeCard from './CodeCard'

type CodeCardListProps = {
  expires: Date;
  codes: string[];
};

export default function CodeCardList({ codes, expires }: CodeCardListProps) {
  return (
    <Grid container spacing={3}>
      {codes.map(code =>
        <Grid item xs={6} key={code}>
          <CodeCard expires={expires} code={code} />
        </Grid>)}
    </Grid>

  )
}
