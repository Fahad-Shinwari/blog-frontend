import React, { useState } from "react";
import "./index.css";
import Tree from "./Tree";

const TreeNode = ({ node }) => {
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;

  return (
    <li className="d-tree-node border-0">
      <div className="d-flex" onClick={(e) => {setChildVisiblity((v) => !v);}}>
        {hasChild && (
          <div
            className={`d-inline d-tree-toggler ${
              childVisible ? "active" : ""
            }`}
          >
            {/* <FontAwesomeIcon icon="caret-right" /> */}-
          </div>
        )}

        <div className="col d-tree-head">
          {node.label}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="d-tree-content">
          <ul className="d-flex d-tree-container flex-column">
            <Tree data={node.children}  />
          </ul>
        </div>
      )}
    </li>
  );
};

export default TreeNode;