import useForm from "../../hooks/useForm";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import { RiSendPlane2Line } from "react-icons/ri";
import aliceAvatar from "../../assets/img/brand/alice-avatar.png";
import { Link } from "react-router-dom";
export default function ChatInput({
  onSubmit = () => {},
  avatar = aliceAvatar,
}) {
  const dataSet = {
    prompt: "",
  };
  const schema = yup.object({
    prompt: yup.string().required().label("prompt"),
  });
  const { dataModel, handleSubmit, handleChange, isFormValid, isBusy } =
    useForm(dataSet, schema);
  const handlePromptKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event, () => onSubmit(dataModel));
    }
  };
  return (
    <div className="chat-input-container pt-4">
      <Container>
        <Row>
          <Col md="10" className="mx-auto">
            <Form onSubmit={(e) => handleSubmit(e, () => onSubmit(dataModel))}>
              <FormGroup className="position-relative">
                <Input
                  id="chat-input"
                  className="chat-input-prompt mt-3"
                  type="textarea"
                  placeholder="Ask me something..."
                  onKeyDown={handlePromptKeyDown}
                  onChange={(e) =>
                    handleChange({
                      field: "prompt",
                      value: e.currentTarget.value,
                    })
                  }
                  value={dataModel.prompt}
                />
                <img
                  src={avatar}
                  alt="avatar"
                  className="chat-input-avatar avatar"
                />
                <Button
                  onClick={(e) => {
                    handleSubmit(e, () => onSubmit(dataModel));
                  }}
                  disabled={!isFormValid()}
                  type="submit"
                  size="sm"
                  color="info"
                  title="Send"
                  className="chat-btn-input border-0 btn-simple"
                >
                  {isBusy ? <Spinner size="sm" /> : <RiSendPlane2Line />}
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
