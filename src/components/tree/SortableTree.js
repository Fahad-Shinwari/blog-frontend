import React,{useState,useEffect} from 'react'
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import './index.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FitNode from '../FitNode';

function SortableTrees() {
  const [treeData, setTreeData] = useState({
    items: [
      { title: 'Chicken', children: [{ title: 'Egg' }], expanded: false },
      { title: 'Fish', children: [{ title: 'fingerline' }], expanded: false },
    ],
  });
  const [categories, setcategories] = useState({
    items: [
      // { title: 'Chicken', children: [{ title: 'Egg' }], expanded: false },
      // { title: 'Fish', children: [{ title: 'fingerline' }], expanded: false },
    ],
  })
  const [category, setcategory] = useState("")
  const [link, setlink] = useState("")
  const [sorts, setsorts] = useState(0)
  const [parentId, setparentId] = useState(null)
  const [copy, setcopy] = useState("")

  let id = '62ec2923065a413f58a4f7a4'

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if(category !== '' || link !== '' || sorts !== '' ) {
    try {
          const blogs = await axios.post(`/newcategory/add`,{
            "title": category,
            "link": link,
            "sorts":sorts,
            "parentId":parentId
        });
        getCategory()
        return toast.success("New Category Added")
        }
        catch(e) {
          console.log(e);
      }
    }
    
    // if(category !== '' || link !== '') {
    //   setTreeData({items:[...treeData.items,{title: category,children:[],expanded:false,link:link}]})
    //   setcategory("")
    //   setlink("")     
    // }
  }
  const onCopied = (msg) => {
    return toast.success("Id Copied to clipboard")
  }

  // const handleCategory = async() => {
  //   try {
  //     const blogs = await axios.patch(`/navigation/${id}`,{"navigationMenu":treeData.items});
  //     window.location.href = '/';
  //   }
  //   catch(e) {
  //     console.log(e);
  //   }
  // }
  const getCategory = async () => {
    try {
      const categories = await axios.get(`/newcategory/`);
      // setcategories(categories.data.category.sort((a,b)=>a.sorts-b.sorts));
      const makeTree = (array, id, parentId, parentValue) =>
      array
        .filter(node => {
          return node[parentId] === parentValue;
        })
        .map(node => {
          node["children"] = makeTree(array, id, parentId, node[id]);
          return node;
        });

      let tree = makeTree(categories.data.category.sort((a,b)=>a.sorts-b.sorts), "_id", "parentId", null);
      setcategories({items:tree})
      
    }
    catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCategory()
  }, [])
  
  
  // console.log(categories)
  // const getCategory = async () => {
  //   try {
  //     const categories = await axios.get(`/navigation/${id}`);
  //     setTreeData({items:categories.data.navigation[0].navigationMenu})
  //   }
  //   catch(e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div className='container-lg mt-5'>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <input type="text" className='form-control mb-3' name="category" value={category} onChange={e=>setcategory(e.target.value)} />
        <label>Link</label>
        <input type="text" className='form-control mb-3' name="link" value={link} onChange={e=>setlink(e.target.value)} />
        <label>Parent Id</label>
        <input type="text" className='form-control mb-3' name="link" value={parentId} onChange={e=>setparentId(e.target.value)} />
        <label>Sort Id (0-9999)</label>
        <input type="number" className='form-control mb-3' name="link" value={sorts} onChange={e=>setsorts(e.target.value)} />
        <button className='btn-lg btn-success mb-5'>Submit</button>
      </form>

      <h2 className='my-4'>Table Tree Structure</h2>
        <table className="table mb-5 table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Links</th>
            <th scope="col">Sort No</th>
            <th scope="col">Copy to Clipboard</th>
          </tr>
        </thead>
        <tbody>
      {categories && categories.items.map(c=>(
       <> 
       <tr key={c._id}>
          <td><h3>{c.title}</h3></td>
          <td><a href={`https://${c.link}`} className="link" target="_blank">{c.link}</a></td>
          <td><h6>{c.sorts}</h6></td>
         <td><CopyToClipboard text={c._id}
            onCopy={()=>onCopied(c._id)}>
          <span className="badge badge-success badge-pill" role="button">Copy</span>
          </CopyToClipboard></td>
        </tr>
          {c?.children.length>0 && <FitNode children={c?.children} k={1} onCopied={onCopied}/>}
          </>
      ))}
      </tbody>
      </table>

        {/* <button className='btn-lg btn-success mb-5' onClick={handleCategory}>Save the Categories</button> */}
      <h2 className='my-4'>Tree Structure</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 800 }}>
        <SortableTree
            treeData={categories && categories.items}
            onChange={(categories) => setcategories({ items: categories })}
          />
          {/* <SortableTree
            treeData={treeData.items}
            onChange={(treeData) => setTreeData({ items: treeData })}
          /> */}
      </div>
    </div>
  )
}

export default SortableTrees