import { useState } from "react";
const useDownloadSvgAsPng = () => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const downloadSvgAsPng = (svgElement, fileName) => {
    const SCALE_FACTOR = 5;
    const canvas = document.createElement("canvas");
    canvas.width = svgElement.width.baseVal.value * SCALE_FACTOR;
    canvas.height = svgElement.height.baseVal.value * SCALE_FACTOR;
    const context = canvas.getContext("2d");
    const image = new Image();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgURL = "data:image/svg+xml;base64," + btoa(svgData);
    image.src = svgURL;
    image.onload = function () {
      context.drawImage(image, 0, 0);
      const pngURL = canvas.toDataURL("image/svg");
      setDownloadUrl(pngURL);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = pngURL;
      link.click();
    };
  };
  const downloadSvgAsSvg = (svgElement, fileName) => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    setDownloadUrl(URL.createObjectURL(svgBlob));
    const link = document.createElement("a");
    link.download = fileName;
    link.href = URL.createObjectURL(svgBlob);
    link.click();
  };
  return { downloadSvgAsPng, downloadSvgAsSvg, downloadUrl };
};

export default useDownloadSvgAsPng;
