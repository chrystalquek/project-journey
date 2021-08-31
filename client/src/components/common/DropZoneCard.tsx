import React, { useState, FC, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    boxShadow: "none",
    border: `thin dashed ${theme.palette.action.disabled}`,

    height: "100%",
    width: "100%",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
  },
  // Used when there is no image.
  addPhotoIcon: {
    flex: "0 0 100%",
    color: theme.palette.action.active,
  },
  instructionText: {
    flex: "0 0 100%",
    color: theme.palette.action.active,
  },
  // Used when there is image.
  overlayContainer: {
    position: "relative",
    height: "100%",
    weight: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  imageContainer: {
    height: "100%",
  },
  clearIcon: {
    color: theme.palette.primary.main,
  },
  clearIconOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
  },
}));

type DropZoneCardProps = {
  id: string;
  initialUrl: string | null;
  onChangeImage: (e: ChangeEvent) => string | null;
};

const DropZoneCard: FC<DropZoneCardProps> = ({
  id,
  initialUrl,
  onChangeImage,
}) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState<string | null>(initialUrl);

  const handleChange = (e: ChangeEvent) => {
    const newImageUrl = onChangeImage(e);
    setImageUrl(newImageUrl);
  };
  return (
    <>
      <label htmlFor={id}>
        <div className={classes.root}>
          {!imageUrl ? (
            <div className={classes.content}>
              <AddAPhotoIcon className={classes.addPhotoIcon} />
              <Typography
                variant="subtitle1"
                align="center"
                className={classes.instructionText}
              >
                Browse file to
                <br />
                add image
              </Typography>
            </div>
          ) : (
            <div className={classes.overlayContainer}>
              <div className={classes.imageContainer}>
                <img src={imageUrl} alt={imageUrl} className={classes.image} />
              </div>
              <div className={classes.clearIconOverlay}>
                <IconButton
                  onClick={() => setImageUrl(null)}
                  className={classes.clearIcon}
                >
                  <ClearIcon fontSize="default" />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      </label>
      <input
        id={id}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </>
  );
};

export default DropZoneCard;
