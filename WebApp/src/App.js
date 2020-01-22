import React from 'react';
import { isEmpty } from './helpers';
import AdminLayout from './components/Layout/AdminLayout';
import AuthLayout from './components/Layout/AuthLayout';
import routes from './routes';

function App() {

  const path = window.location.pathname.toLowerCase().split('/')[1]

  const findExpecificRoute = path =>{
    var principal,icon;
    let find = routes.find(i=>{
        principal = i.name;
        icon = i.icon;
        if(i.hasOwnProperty('children')){
          let ch = i.children.find(j=>{ return j.path.toLowerCase() === '/' + path; })
          return !isEmpty(ch) ? ch : false
        }
       return i.path.toLowerCase() === '/' + path; 
    })

    if(!isEmpty(find) && find.hasOwnProperty('children'))
      find =find.children.find(j=>{ return j.path.toLowerCase() === '/' + path; })
    find = {...find,...{Pname:principal,icon}};
    return !isEmpty(find) ? {check : find.path.toLowerCase() === '/'+path,data:find} : false
  }
  const checkRouter = path =>{
    const {check, data} = findExpecificRoute(path)
    return check
    ? <AdminLayout pageinfo = {data}/>
    : <h1>Not Found...</h1>
  }

  return (
    <>
      {
        isEmpty(path)
        ?<AuthLayout />
        :path !== 'auth'
        ? checkRouter(path)
        :path === 'auth'
        ? <AuthLayout />
        : <h1>Not Found...</h1>
       
      }
    </>
  );
}

export default App;
