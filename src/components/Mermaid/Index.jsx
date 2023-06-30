import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { CgSoftwareDownload } from "react-icons/cg";
import useDownloadSvgAs from "../../hooks/useDownloadSvgAs";
import { BsFiletypeSvg, BsFiletypePng } from "react-icons/bs";

mermaid.initialize({
  startOnLoad: true,
  theme: "default",
  securityLevel: "loose",
  themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    } 
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
  fontFamily: "Fira Code",
});

const DefaultFallBack = () => (
  <span>Sorry | I can only build certain charts for you</span>
);

export default function Mermaid({ chart, fallback = <DefaultFallBack /> }) {
  const mermaidChart = useRef();
  const [_fallback, setFallback] = useState(false);
  const { downloadSvgAsPng, downloadSvgAsSvg } = useDownloadSvgAs();
  useEffect(() => {
    if (mermaidChart.current) {
      mermaidChart.current?.removeAttribute("data-processed");
      mermaid.contentLoaded();
    }
    mermaid
      .parse(chart)
      .then(() => setFallback(false))
      .catch((err) => setFallback(true));
  }, [chart]);
  if (_fallback) return fallback;
  return (
    <div className="mermaid-container">
      <div className="p-2 mb-1 rounded-3">
        <UncontrolledDropdown>
          <DropdownToggle outline className="border-0">
            Download
            <CgSoftwareDownload />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                const svgimage = mermaidChart.current?.querySelector("svg");
                downloadSvgAsSvg(svgimage, svgimage.id + ".svg");
              }}
            >
              <BsFiletypeSvg /> Download SVG
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                const svgimage = mermaidChart.current?.querySelector("svg");
                downloadSvgAsPng(svgimage, svgimage.id + ".png");
              }}
            >
              <BsFiletypePng /> Download PNG
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <div ref={mermaidChart} className="mermaid">
        {chart}
      </div>
    </div>
  );
}
