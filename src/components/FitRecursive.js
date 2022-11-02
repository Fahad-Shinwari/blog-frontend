import React from 'react'
import FitNode from './FitNode';
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import "react-bootstrap-submenu/dist/index.css";
import { Link } from 'react-router-dom';

function FitRecursive({children = []}) {
  console.log(children);
  return (
    <div>
      {/* {(children.length===0 || children=== undefined) return '' } */}
      { children.map((child,i)=>(
        // console.log(child)
        <>
        {child.children.length === 0 ? 
        <li className="nav-item"> <Link to="/users" className='nav-link text-dark'>{child.title}</Link></li> :
        <DropdownSubmenu href="#action/3.7" title={child.title} >
        {(child.children === undefined || child.children.length !== 0) && <FitRecursive children={child.children} />} 
        </DropdownSubmenu>
        }
        </>
    ))}

  {/* <div class="dropdown-menu" aria-labelledby="something">
    {children!== undefined && children?.map(child=>(
        <a class="dropdown-item" href="#">{child.title}</a> */}
        {/* // {child?.children.length>0 && FitRecursive(child.children)} */}
        {/* ))} */}
  {/* </div> */}
    </div>
  )
}

export default FitRecursive