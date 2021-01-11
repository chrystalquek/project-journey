import React, {FC} from "react";
import {makeStyles, Typography, Theme, Box, useTheme} from "@material-ui/core";

type SectionTitleProps = {
  text: string,
  textCenter?: boolean,
  fontBold?: boolean,
  gutterBottom?: boolean,
  borderBottom?: boolean,
  borderTop?: boolean,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: SectionTitleProps) => ({
    textAlign: props.textCenter ? 'center' : 'initial',
    paddingBottom: '0.1rem',
    marginBottom: props.gutterBottom ? '1rem' : '0',
    borderTop: props.borderTop ? '2px solid #CECECE' : 'none',
    borderBottom: props.borderBottom ? '2px solid #CECECE' : 'none',
    fontWeight: props.fontBold ? 'bold' : 'normal'
  })
}));

const EventHeader: FC<SectionTitleProps> = (props) => {
  const { text } = props;
  const classes = useStyles(props);
  const theme = useTheme<Theme>();

  return (
    <Box
      className={classes.root}
      fontFamily={theme.typography.fontFamily}
      fontSize={theme.typography.h3.fontSize}
    >
      {text}
    </Box>
  )
}

export { EventHeader };
