// IGNORE
import React, { FC } from 'react';
import {
  makeStyles, Theme, Box, useTheme,
} from '@material-ui/core';

type SectionTitleProps = {
  text: string,
  fontSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2',
  textCenter?: boolean,
  fontBold?: boolean,
  gutterBottom?: boolean,
  borderBottom?: boolean,
  borderTop?: boolean,
  gutterTop?: boolean,
}

const useStyles = makeStyles(() => ({
  root: (props: SectionTitleProps) => ({
    textAlign: props.textCenter ? 'center' : 'initial',
    paddingBottom: '0.1rem',
    marginBottom: props.gutterBottom ? '0.35em' : '0',
    marginTop: props.gutterTop ? '0.35em' : '0',
    borderTop: props.borderTop ? '2px solid #CECECE' : 'none',
    borderBottom: props.borderBottom ? '2px solid #CECECE' : 'none',
    fontWeight: props.fontBold ? 'bold' : 'normal',
    whiteSpace: 'pre-line',
  }),
}));

const EventTypography: FC<SectionTitleProps> = (props) => {
  const { fontSize, text } = props;
  const classes = useStyles(props);
  const theme = useTheme<Theme>();

  return (
    <Box
      className={classes.root}
      fontFamily={theme.typography.fontFamily}
      fontSize={theme.typography[fontSize ?? 'body1'].fontSize}
    >
      {text}
    </Box>
  );
};

export { EventTypography };
