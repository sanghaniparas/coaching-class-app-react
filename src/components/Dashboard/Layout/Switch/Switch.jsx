import React from 'react'

export const Switch = ({ isOn, handleToggle }) => {
  let classNames = ["switch", (isOn) ? "switch_is-on" : "switch_is-off"].join(" ");
  return (
    <div className={classNames} onClick={handleToggle}>
      <ToggleButton
        isOn={isOn}
      />
    </div>
  );
}

const ToggleButton = function ({ isOn }) {
  let classNames = ["toggle-button", (isOn) ? "toggle-button_position-right" : "toggle-button_position-left"].join(" ");
  return (<div className={classNames}></div>);
};
