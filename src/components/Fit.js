import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png';
import axios from 'axios'
import FitRecursive from './FitRecursive';

function Fit() {
  let id = '62ec2923065a413f58a4f7a4'
  const [treeData, setTreeData] = useState({
    items: [
      // { title: 'Chicken', children: [{ title: 'Egg' }], expanded: false },
      // { title: 'Fish', children: [{ title: 'fingerline' }], expanded: false },
    ],
  });
  useEffect(() => {
    getCategory()
  }, [])
  

  const getCategory = async () => {
    try {
      const categories = await axios.get(`/navigation/${id}`);
      setTreeData({items:categories.data.navigation[0].navigationMenu})
    }
    catch(e) {
      console.log(e);
    }
  }

  // const dynamicMenu = (children,title) => {
  //   console.log(children,title);
  //   <h1>{title}</h1>
  //   {children.map(child=>(
  //     <div>
  //       <li>{child.title}</li>
  //       {child?.children.length>0 && dynamicMenu(child.children)}
  //     </div>  
  //   ))}
  // }
console.log(treeData);
  return (
    <div>
      {treeData && treeData.items.map(tree=>(
        <ul>
          <li>{tree.title}</li>
            
          {tree?.children.length>0 && <FitRecursive children={tree?.children}/>}
        </ul>  
      ))}
            
    </div>
  )
}

export default Fit