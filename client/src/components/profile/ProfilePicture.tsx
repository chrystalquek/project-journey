import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PhotoCamera } from "@material-ui/icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useAppDispatch } from "@redux/store";
import { uploadAndGetFileUrl } from "@utils/helpers/uploadAndGetFileUrl";
import { updateVolunteer } from "@redux/actions/user";

const useStyles = makeStyles((theme) => ({
  button: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: "100px",
    width: "100px",
    objectFit: "cover",
  },
  input: {
    display: "none",
  },
}));

const ProfilePicture = ({ profilePageData }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // ReactCrop documentation
  // https://www.npmjs.com/package/react-image-crop

  let fileUrl = "";
  const [file, setFile] = useState<File>(null);
  const [src, setSrc] = useState<string>(null);
  const [imageRef, setImageRef] = useState(null);
  // TODO: decide whether to remove this state
  const [, setNewImageUrl] = useState<string>("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 1 / 1,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const getCroppedImg = async (image, { x, y, width, height }) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      x * scaleX,
      y * scaleY,
      width * scaleX,
      height * scaleY,
      0,
      0,
      width,
      height
    );

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Canvas is empty");
        }
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        resolve(fileUrl);
      }, "image/jpeg");
    });
  };

  const makeClientCrop = async (clientCrop) => {
    if (imageRef && crop.width && clientCrop.height) {
      const croppedImageUrl = await getCroppedImg(imageRef, clientCrop);
      setNewImageUrl(croppedImageUrl);
    }
  };

  const onCropComplete = (newCrop) => {
    makeClientCrop(newCrop);
  };

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleSave = async () => {
    const photoUrl = await uploadAndGetFileUrl(file, "image");
    const updatedVolunteerData = { ...profilePageData, photoUrl };
    dispatch(
      updateVolunteer({ _id: profilePageData._id, data: updatedVolunteerData })
    );
    setSrc(null);
  };

  const handleCancel = useCallback(() => {
    setSrc(null);
  }, [src]);

  return (
    <div>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <div>
            <label htmlFor="file-input">
              <Avatar className={classes.button}>
                <PhotoCamera className={classes.icon} />
              </Avatar>
              <input
                id="file-input"
                className={classes.input}
                type="file"
                accept="image/jpg, image/png"
                onChange={onSelectFile}
              />
            </label>
          </div>
        }
      >
        <Avatar
          alt={profilePageData.name}
          className={classes.avatar}
          src={profilePageData.photoUrl}
        />
      </Badge>
      <Dialog
        open={src !== null}
        fullScreen={isMobile}
        onClose={handleCancel}
        scroll="body"
      >
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              circularCrop
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
              style={{ maxWidth: "100%" }}
              imageStyle={{ maxWidth: "100%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePicture;
