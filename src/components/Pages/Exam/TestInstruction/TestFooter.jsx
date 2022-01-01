import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { LineArrow } from "../../../Core/Layout/Icon";

const TestFooter = ({ match, check, id, testPackageId }) => {
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const onOpenModal = () => {
    setOpen(true);
    // window.location.href= `/testdetails/${testPackageId}`;
  };

  const onCloseModal = (testPackageId) => {
    setOpen(false);
    window.location.href = `/testdetails/${testPackageId}`;
  };

  return (
    <>
      <div className="temp-footer-wrapper testinst">
        <span className="btn-grey" onClick={() => history.goBack()}>
          Previous
        </span>
        <button
          style={check ? null : { cursor: "no-drop" }}
          disabled={!check}
          className={`${
            check ? "btn-primary radius" : "btn-primary radius disabled"
          }`}
          onClick={() => {
            onOpenModal();
          }}
        >
          I am ready to begin
        </button>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="language-modal">
          <p>
            Do you want to set your default language to{" "}
            {localStorage.langId === "1" || !localStorage.langId
              ? "English"
              : "Hindi"}
            ?
          </p>
          <div className="language-btn">
            <button
              className="btn-no radius"
              onClick={() => onCloseModal(testPackageId)}
            >
              No
            </button>
            <button
              className="btn-primary radius"
              onClick={() => {
                window.open(
                  `/exam`,
                  "mywindow",
                  "height=" +
                    window.screen.height +
                    ",width=" +
                    window.screen.width +
                    ""
                );
                onCloseModal(testPackageId);
                // window.location.href= `/exam`;
                window.location.href = `/testdetails/${testPackageId}`;
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

// () => history.push(`/exam/${match.params.id}`)

export default withRouter(TestFooter);
