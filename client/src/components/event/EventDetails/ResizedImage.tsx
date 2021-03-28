import React, { FC } from 'react';
import {
  makeStyles,
} from '@material-ui/core';

// https://www.kirupa.com/html5/preserve_an_image_aspect_ratio_when_resized.htm#:~:text=The%20Simple%20Solution%20Using%20CSS&text=By%20setting%20the%20width%20property,the%20aspect%20ratio%20is%20maintained.
const useStyles = makeStyles({
  image: {
    width: '100%',
    height: 'auto',
  },
});

type ResizedImageProps = {
    img: string
    name: string
}

const ResizedImage: FC<ResizedImageProps> = ({ img, name }) => {
  const classes = useStyles();

  return (
    <img className={classes.image} src={img} alt={name} />
  );
};

export default ResizedImage;
