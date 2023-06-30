import { Col, Container, Row, Spinner } from "reactstrap";
import React from "react";
import ImageDropZone from "../../../components/Uploaders/imageUploader/ImageDropzone";
import { useApplication } from "../../../stores/applicationStore";
import PersonalDetailsForm from "./PersonalDetailsForm";
import UpdatePassword from "./UpdatePassword";
import { USER_ACTIONS, useProfile } from "./profileStore";
const Content = () => {
  const { currentUserData } = useApplication();
  const {
    processing,
    updateUserProfile,
    updateUserPassword,
    changeProfilePicture,
  } = useProfile();
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col md="6" className="mx-auto">
            <Row>
              <Col md="12">
                <h4 className="mb-2 text-center">Personal details</h4>
                {processing[USER_ACTIONS.CHANGE_PROFILE_PICTURE].status ? (
                  <div className="text-center">
                    {" "}
                    <Spinner size="lg" />
                  </div>
                ) : (
                  <ImageDropZone
                    url={currentUserData?.profileImage?.src}
                    onChange={(image) => {
                      changeProfilePicture(currentUserData?._id, image.file);
                    }}
                  />
                )}
              </Col>
              <Col md="12">
                <PersonalDetailsForm
                  data={{
                    name: currentUserData?.name,
                    organisationName: currentUserData?.organisationName,
                    jobTitle: currentUserData?.jobTitle,
                  }}
                  onSubmit={(data) =>
                    updateUserProfile(currentUserData?._id, data)
                  }
                />
              </Col>
              <Col md="12" className="mt-2">
                <h4 className="text-center">Manage password</h4>
                <UpdatePassword
                  onSubmit={(data) =>
                    updateUserPassword(currentUserData?._id, data)
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Content;
