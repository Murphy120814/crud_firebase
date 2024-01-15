import ReactDOM from "react-dom";

const ReactPortalContainer = ({ children }) => {
  const portalContainer = document.getElementById("portal");

  return ReactDOM.createPortal(children, portalContainer);
};

export default ReactPortalContainer;
