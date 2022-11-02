import React,{useState} from "react";
import Tree from "./Tree";

const TreeList = () => {
  const [first, setfirst] = useState([
    {
      key: "0",
      label: "Documents",
      title: "Documents Folder",
      children: [
        {
          key: "0-0",
          label: "Document 1-1",
          title: "Documents Folder",
          children: [
            {
              key: "0-1-1",
              label: "Document-0-1.doc",
              title: "Documents Folder",
              children: [
                {
                  key: "0-1-2",
                  label: "Document-0-2.doc",
                  title: "Documents Folderdmmdm",
                },
                {
                  key: "0-1-3",
                  label: "Document-0-3.doc",
                  title: "Documents Folderdmmdm,",
                },
                {
                  key: "0-1-4",
                  label: "Document-0-4.doc",
                  title: "Documents Folder",
                },
              ]
            },
          ],
        },
      ],
    },
  ])
  const [category, setcategory] = useState("")
  const addData = (e) => {
    e.preventDefault()
    if(category !== '') {
      setfirst([...first,{key:"1",label:category,title:category,children:[]}])
      setcategory("")
    }
  }
console.log(category)
  return (
    <>
      <div className="row">
        <div className="col text-center">
          {/* <h2>Tree Visualization component</h2> */}
          <p className="mt-3">
            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-lg-8 text-left text-dark">
                <form onSubmit={addData}>
                <input type="text" name="cat" value={category} className="form-control mb-4" onChange={e=>setcategory(e.target.value)} />
                <button className="btn btn-primary" onClick={addData}>Add Data</button>
                </form>
                <Tree data={first} />
              </div>
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default TreeList;