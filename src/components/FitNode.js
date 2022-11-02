import React from 'react'
import FitRecursive from './FitRecursive';
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function FitNode({children = [],onCopied,k}) {
  // console.log("k",k);
  const dashes = () => {
    let dash = ""
    for(let i=0;i<k;i++){
      dash = dash + "-"
    }
    return dash
  }
  return (
    <>
      {/* {(children.length===0 || children=== undefined) return '' } */}
      {children && children.map((child,i)=>(
        <>
        <tr key={i}>
        <td><h5><span className='badge badge-primary'>{dashes()}</span> {child.title}</h5></td>
        <td><a href={`https://${child.link}`} className="link" target="_blank">{child.link}</a></td>
        <td><h6>{child.sorts}</h6></td>
        <td><CopyToClipboard text={child._id}
            onCopy={()=>onCopied(child._id)}>
          <span className="badge badge-primary badge-pill" role="button">Copy</span>
          </CopyToClipboard> </td>
        </tr>
        {child.children.length>0 && <FitNode children={child.children} k={k+1} /> } 
        </>
    ))}

  {/* <div class="dropdown-menu" aria-labelledby="something">
    {children!== undefined && children?.map(child=>(
        <a class="dropdown-item" href="#">{child.title}</a>
        {child.children.length>0 && FitRecursive(child.children)}
        ))}
  </div> */}
    </>
  )
}

export default FitNode