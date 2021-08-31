import { Avatar, Badge, Button } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PhotoCamera } from "@material-ui/icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Dialog from "@components/common/feedback/Dialog";
import DialogTitle from "@components/common/feedback/DialogTitle";
import DialogContent from "@components/common/feedback/DialogContent";
import DialogActions from "@components/common/feedback/DialogActions";
import { useAppDispatch } from "@redux/store";
import { uploadAndGetFileUrl } from "@utils/helpers/uploadAndGetFileUrl";
import { updateVolunteer } from "@redux/actions/user";
import { assert } from "@utils/helpers/typescript";

const useStyles = makeStyles((theme) => ({
  button: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  icon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(29),
    width: theme.spacing(29),
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
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [imageRef, setImageRef] = useState(null);
  // TODO: decide whether to remove this state
  const [, setNewImageUrl] = useState<string>("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 1 / 1,
  });

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

    ctx?.drawImage(
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
    assert(file, "File must be present before saving");
    const photoUrl = await uploadAndGetFileUrl(file, "image");
    const updatedVolunteerData = { ...profilePageData, photoUrl };
    dispatch(
      updateVolunteer({ _id: profilePageData._id, data: updatedVolunteerData })
    );
    setSrc(null);
  };

  const handleCancel = useCallback(() => {
    setSrc(null);
  }, []);

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
        onClose={handleCancel}
        scroll="body"
        maxWidth="sm"
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
        <DialogActions justifyContent="flex-end">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePicture;
