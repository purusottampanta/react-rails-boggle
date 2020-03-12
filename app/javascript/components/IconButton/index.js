import React from "react";
import "./IconButton.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = props => {
  const { handleSubmit, tooltip, iconName, extraClass } = props;

  var icon = iconName ? iconName : "home";

  return (
    <span
      className={extraClass ? extraClass : "action-button"}
      data-tip={tooltip ? tooltip : null}
    >
      <FontAwesomeIcon
        onClick={handleSubmit}
        icon={['far', icon]}
      />
    </span>
  );
};

export default IconButton;
