import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: React.PropsWithChildren) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  if (!portalRoot) {
    return <></>;
  }

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
