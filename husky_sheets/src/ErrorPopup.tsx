import React from "react";
import Popup from "reactjs-popup";

/*
This function is responsible for the UI for the error popup.
But for now, it will not appear in the code

Owner: Amani
*/
function ErrorPopup() {
  const [open, setOpen] = React.useState(false);

  const openPopup = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      <Popup open={open} closeOnDocumentClick onClose={openPopup}>
        <div className="popup-content">
          <p>
            The information that you have entered is invalid. Please try again
          </p>
        </div>
      </Popup>
    </div>
  );
}

export default ErrorPopup;
