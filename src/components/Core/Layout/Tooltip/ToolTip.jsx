import React from 'react';

export const ToolTip = ({ message, position, children }) => {
  const [openTooltip, toggleTooltip] = React.useState(false);

  const showTooltip = () => {
    console.log("hover",message);
    toggleTooltip(true);
  };
  const hideTooltip = () => {
    toggleTooltip(false);
  };

  return (
    <span className="tooltip" onMouseLeave={hideTooltip}>
      {openTooltip && (
        <div className={`tooltip-bubble tooltip-${position}`}>
          <div className="tooltip-message">{message}</div>
        </div>
      )}
      <span className="tooltip-trigger" onMouseOver={showTooltip}>
        {children}
      </span>
    </span>
  );
};
