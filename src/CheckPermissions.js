const permissions = localStorage.getItem("permissions")
const isAdmin = localStorage.getItem("isAdmin")

export function checkPermissionsForPostList () {
    if(permissions?.includes(process.env.REACT_APP_POST_LIST) || isAdmin) {
      return true
    }
}

export function updatePostStatusPermission () {
    if(permissions?.includes(process.env.REACT_APP_POST_STATUS_CHANGE) || isAdmin) {
      return true
    }
}

export function addPostPermission () {
    if(permissions?.includes(process.env.REACT_APP_POST_ADD) || isAdmin) {
      return true
    }
}

export function singlePostViewPermission () {
    if(permissions?.includes(process.env.REACT_APP_POST_VIEW) || isAdmin) {
      return true
    }
}

export function categoriesListPermission () {
  if(permissions?.includes(process.env.REACT_APP_CATEGORY_LIST) || isAdmin) {
    return true
  }
}

export function addCategoryPermission () {
  if(permissions?.includes(process.env.REACT_APP_CATEGORY_ADD) || isAdmin) {
    return true;
  }
}

export function updateCategoryPermission () {
  if(permissions?.includes(process.env.REACT_APP_CATEGORY_VIEW) || isAdmin) {
    return true;
  }
}

export function deleteCategoryPermission () {
  if(permissions?.includes(process.env.REACT_APP_CATEGORY_DELETE) || isAdmin) {
    return true;
  }
}