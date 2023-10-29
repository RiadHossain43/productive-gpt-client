import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";
import DropZone from "../../../components/Dropzone/Index";
import useGPTResponseGenerator from "../../../hooks/useGPTResponseGenerator";
import ChartCompiler from "./ChartCompiler";
import Navigationbar from "./Navigationbar";
import MDFormatedResponse from "../../../components/Chat/MDFormatedResponse";
import Papa from "papaparse";
import { TbAnalyzeFilled, TbDatabaseImport } from "react-icons/tb";
import { MdOutlineSelectAll } from "react-icons/md";
function extractCodeFromMarkdown(markdownText) {
  const codeBlockRegex = /```javascript([\s\S]*?)```/;
  const matches = markdownText.match(codeBlockRegex);
  if (matches) {
    const code = matches[1].trim(); // Trim to remove leading/trailing whitespace
    return code;
  }

  return null; // Return null if no code block is found
}
const sampleRange = (data) => {
  return data.length > 5 ? 5 : data.length - 1;
};
const DataAnalysis = () => {
  const { currentlyStreaming: chartStream, streamResponse: chartStreamer } =
    useGPTResponseGenerator();
  const [generatedScript, setGeneratedScript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [dataset, setDataset] = useState([]);
  const [file, setFile] = useState(null);
  const systemInstructions = [
    {
      role: "system",
      content: `
Given an example datastucture as following, but there can be more than 100000 rows of data item possible.
Example: 
const dataset = ${JSON.stringify(
        dataset.slice(0, sampleRange(dataset))
      )}; // there are be more which are not added

Prepare necessary charts that is required for generating the analytics users ask for using chart.js chart library.

Use this knowledge to assume you are reading data from a dataset array. 

Important: Dont add any variales related to datastrucure, assume the above mentioned dataset is global variable named ***dataset*** 
and use it in your code, because this data variable will be prepended with the code you produce and will be excuted later.

You can use data formatting or any restructuring based on the required chart from user, consider the ***dataset*** variable in 
all kinds of code.

Consider that the chart container canvas has an id of #chart and write all your code to render the chart in it.

Provide your code snippeents in code bloks like this \`\`\` so that it can be detected as js code.
Make sure in all your codes you are following latest syntex.
Make sure the full code is added into a single codeblock. And don't need to include extra explanation or details.

Use following colors in chart gridlines or chart area or lines. You can randomly chose colors.

#2bffc6
#11cdef
#2dce89
#ffd600
#fb6340
#f5365c
#f3a4b5
#8965e0
#5603ad
#5e72e4

Put minimum chart height 600px and make sure the chart takes full width of parent.

Make sure x and y axis are #ffffffcc in color, legands and units of the charts are #ffffffcc #344675 in color and 
bold enough to catch on the eye and grid line colors are #344675
`,
    },
  ];
  function handleParse(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
        skipEmptyLines: "trailing",
      });
      const parsedData = csv?.data;
      const columns = Object.keys(parsedData[0]);
      let sheet = { name: file?.path, columns, dataMap: {}, data: parsedData };
      setDataset(sheet.data);
      setFile(file);
    };
    reader.readAsText(file);
  }
  useEffect(() => {
    if (chartStream.isStreamComplete) {
      if (extractCodeFromMarkdown(chartStream.responseStream)) {
        const script =
          `
            const dataset = JSON.parse(\`${JSON.stringify({
              data: dataset,
            })}\`).data
          ` + extractCodeFromMarkdown(chartStream.responseStream);

        setGeneratedScript(script);
        console.log(script);
      }
    }
  }, [chartStream]);

  useEffect(() => {
    if (dataset.length)
      chartStreamer({
        prompt: "Suggest some usefull analytics on this dataset",
        conversation: [],
        systemInstructions: systemInstructions,
      });
  }, [dataset]);

  return (
    <React.Fragment>
      <Navigationbar />
      <div className="data-analysis-container">
        <div className="chart-area">
          {generatedScript && <ChartCompiler injectedCode={generatedScript} />}
        </div>
        <div className="file-area">
          <DropZone
            acceptedFileTypes={".csv"}
            hint={
              <span>
                <MdOutlineSelectAll /> Select spread sheed{" "}
              </span>
            }
            onLoad={(files) => {
              handleParse(files[0]);
            }}
          />
        </div>
        <div className="chat-area rounded">
          {dataset.length ? (
            <React.Fragment>
              <p className="filename mb-2">
                <TbDatabaseImport /> Data source: {file?.path}
              </p>
              <FormGroup>
                <Input
                  type="textarea"
                  className="rounded"
                  onChange={(e) => {
                    setPrompt(e.currentTarget.value);
                  }}
                />
              </FormGroup>
              <Button
                size="sm"
                block
                color="primary"
                disabled={!chartStream.isStreamComplete}
                onClick={() => {
                  setGeneratedScript("");
                  chartStreamer({
                    prompt,
                    conversation: [],
                    systemInstructions: systemInstructions,
                  });
                }}
              >
                <TbAnalyzeFilled /> Analyze
              </Button>
              <MDFormatedResponse
                isTyping={!chartStream.isStreamComplete}
                renderPlugins
              >
                {chartStream.responseStream}
              </MDFormatedResponse>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DataAnalysis;

// const d3systemInstructions = [
//   {
//     role: "system",
//     content: `
// Given an example datastucture as following, but there can be more than 100000 rows of data item possible.
// Example:
// const dataset = ${JSON.stringify(
//   dataset.slice(0, sampleRange(dataset))
// )}; // there are be more which are not added

// Prepare necessary charts that is required for generating the analytics users ask for using d3.js chart library.

// Use this knowledge to assume you are reading data from a dataset array.

// Important: Dont add any variales related to datastrucure, assume the above mentioned dataset is global variable named ***dataset***
// and use it in your code, because this data variable will be prepended with the code you produce and will be excuted later.

// You can use data formatting or any restructuring based on the required chart from user, consider the ***dataset*** variable in
// all kinds of code.

// Consider that the chart container has an id of #d3-container and write all your code to render the chart in it.

// Provide your code snippeents in code bloks like this \`\`\` so that it can be detected as js code.
// Make sure in all your codes you are following d3 v7.0.0 syntex.
// Make sure the full code is added into a single codeblock.

// Use following colors in chart gridlines or chart area or lines. You can randomly chose colors.

// #2bffc6
// #11cdef
// #2dce89
// #ffd600
// #fb6340
// #f5365c
// #f3a4b5
// #8965e0
// #5603ad
// #5e72e4

// Make sure x and y axis are #344675 in color, legands and units of the charts are #344675 in color and bold enough to catch on the eye.
// `,
//   },
// ];
