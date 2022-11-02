import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { createCategory,deleteCategory,getCategory,updateCategory } from '../redux'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { categoriesListPermission,addCategoryPermission,updateCategoryPermission,deleteCategoryPermission } from '../CheckPermissions';
import TreeList from './tree/TreeList';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%'
  },
};

function Categories() {
  const [category, setcategory] = useState("")
  const dispatch = useDispatch();
  const categories = useSelector(state =>  state.category?.categories?.data?.category)
  const [renderFirstTime, setrenderFirstTime] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateCat, setupdateCategory] = useState({})

  const openModal = (cat) => {
    setIsOpen(true);
    setcategory(cat.name)
    setupdateCategory(cat);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const changeCategory = e => {
    e.preventDefault();
    if(updateCategoryPermission()) { 
      dispatch(updateCategory(updateCat._id,category))
      setIsOpen(false);
      setrenderFirstTime(true)
    }else{
      return toast.error("No Access to update category")
    }
  }

  useEffect(() => {
    if(categoriesListPermission()) {
      dispatch(getCategory())
      setrenderFirstTime(false)
    } else {
      return toast.error("No Access for categories")
    }  
  }, [renderFirstTime && categories])
  
  const handleSubmit = e => {
    e.preventDefault();
    if(addCategoryPermission()) {
      dispatch(createCategory(category))
      setrenderFirstTime(true)
      setcategory('')
    }else{
      return toast.error("No Access to add category")
    }
  }

  const handleDelete = id => {
    if(deleteCategoryPermission()) { 
      dispatch(deleteCategory(id))
      setrenderFirstTime(true)
    }else{
      return toast.error("No Access to delete category")
    }
  }

  return (
    <div className='my-4 container-lg'>
        <form onSubmit={handleSubmit}>
          <h2>Category</h2>
          <input type="text" className='form-control' name="category" value={category} onChange={e=>setcategory(e.target.value)}/>
          <button className='btn btn-success mt-4'>Submit category</button>
        </form>
        <h2 className='my-5'>Categories</h2>
        <TreeList />
        <ul className="list-group">
        {categories?.map(cat=>(
          <li className="list-group-item d-flex justify-content-between align-items-center" role="button" key={cat._id}>
          <span onClick={()=>openModal(cat)}>{cat.name}</span>
          <span className="badge badge-danger badge-pill " role="button" onClick={()=>handleDelete(cat._id)}>x</span>
          </li>
        ))}
        </ul>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Example Modal"
        >
          <div className='d-flex justify-content-between'>
          <h2>Change Category Name</h2>
          <button className='btn btn-danger' onClick={closeModal}>x</button>
          </div>
          <form onSubmit={changeCategory}>
            <label style={{color:"black"}}>Category</label>
            <input type="text" name="category" className='form-control' defaultValue={updateCat.name} onChange={e=>setcategory(e.target.value)}/>
            <button className='btn btn-success mt-4'>Submit category</button>
          </form>
        </Modal>
    </div>
  )
}

export default Categories