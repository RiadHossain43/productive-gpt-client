import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./canvasUtils";
import { Button } from "reactstrap";
import { FiCheckCircle } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import classNames from "classnames";
const ImageEditor = ({
  photoUrl = "https://plus.unsplash.com/premium_photo-1683880731020-83b984105a72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=384&q=80",
  onCropConfirm = () => {},
  onCropCancel = () => {},
  position = "center",
}) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixes] = useState();
  const _onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixes(croppedAreaPixels);
  }, []);
  const confirmCrop = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(photoUrl, croppedAreaPixels);
      onCropConfirm(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);
  return (
    <div className="">
      <div
        className={classNames("image-editor mb-2", {
          "mx-auto": position === "center",
        })}
      >
        <Cropper
          classes={{
            containerClassName: "",
          }}
          image={photoUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={_onCropComplete}
        />
      </div>
      <div
        className={classNames("", {
          "d-flex justify-content-center": position === "center",
        })}
      >
        <Button size="sm" color="success" onClick={confirmCrop}>
          Confirm <FiCheckCircle />
        </Button>
        <Button size="sm" color="danger" onClick={onCropCancel}>
          Cancel <RxCrossCircled />
        </Button>
      </div>
    </div>
  );
};

export default ImageEditor;
