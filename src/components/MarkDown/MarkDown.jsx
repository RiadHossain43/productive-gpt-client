import React from "react";
import {Row,Col} from 'reactstrap'
import ReactMarkdown from "react-markdown";
const MarkDown = ({markdown}) => {
  return (
    <Row>
      <Col lg='10' className='mx-auto'>
        <ReactMarkdown 
          children={markdown}
        />
      </Col>
    </Row>
  );
};

export default MarkDown;
