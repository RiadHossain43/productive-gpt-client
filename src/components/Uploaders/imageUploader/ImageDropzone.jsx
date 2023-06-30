import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { readFileAsDataUrl } from "../../../utils/readFile";
import ImageEditor from "./ImageEditor";
import { Button } from "reactstrap";
import { FiEdit } from "react-icons/fi";
import classNames from "classnames";
export default function ImageDropZone({
  hint = "+",
  url,
  onChange = () => {},
  disabled,
  position = "center",
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [editing, setEditing] = useState(false);
  const onDrop = React.useCallback(
    async (acceptedFiles, rejectedFiles) => {
      setSelectedFile(null);
      let imageSrc = await readFileAsDataUrl(acceptedFiles[0]);
      setImageSrc(imageSrc);
      setSelectedFile(acceptedFiles[0]);
      /** as soon as new file is droped we open editor */
      setEditing(true);
    },
    [selectedFile]
  );
  useEffect(() => {
    if (url) {
      setImageSrc(url);
    }
  }, [url]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop,
    multiple: false,
    disabled: disabled,
  });
  return (
    <section
      className={classNames("", {
        "mx-auto": position === "center",
      })}
    >
      {editing ? (
        <ImageEditor
          photoUrl={imageSrc}
          onCropConfirm={(image) => {
            setImageSrc(image.url);
            onChange({
              ...image,
              file: new File([image.blob], selectedFile?.name, {
                lastModified: selectedFile?.lastModified,
                lastModifiedDate: selectedFile?.lastModifiedDate,
                name: selectedFile.name,
                size: image?.blob?.size,
                type: selectedFile?.type,
              }),
            });
            setEditing(false);
          }}
          onCropCancel={() => {
            setEditing(false);
          }}
          position={position}
        />
      ) : (
        <div
          {...getRootProps({
            className: classNames("image-dropzone mb-2", {
              "mx-auto": position === "center",
            }),
          })}
        >
          <input {...getInputProps()} />
          {imageSrc ? <img width="100%" src={imageSrc} /> : <p>{hint}</p>}
        </div>
      )}
      {imageSrc && !editing && (
        <div
          className={classNames("", {
            "d-flex justify-content-center": position === "center",
          })}
        >
          <Button size="sm" outline {...getRootProps({})}>
            Change <FiEdit />
          </Button>
          {/* <Button size="sm" outline onClick={() => setEditing(true)}>
            Edit <FiEdit />
          </Button> */}
        </div>
      )}
    </section>
  );
}
