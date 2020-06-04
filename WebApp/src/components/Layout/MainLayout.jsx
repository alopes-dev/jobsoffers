import React from 'react';
import { isEmpty } from '../../helpers';
import AdminLayout from './AdminLayout';
import routes from '../../routes';

const MainLayout = () => {
  let path = 'dashboard';
  if (window.location.pathname !== undefined)
    path = window.location.pathname.toLowerCase().split('/')[1];

  const findExpecificRoute = (path) => {
    var principal, icon;
    let find = routes.find((i) => {
      principal = i.name;
      icon = i.icon;
      if (i.hasOwnProperty('children')) {
        let ch = i.children.find((j) => {
          return j.path.toLowerCase() === '/' + path;
        });
        return !isEmpty(ch) ? ch : false;
      }
      return i.path.toLowerCase() === '/' + path;
    });

    if (!isEmpty(find) && find.hasOwnProperty('children'))
      find = find.children.find((j) => {
        return j.path.toLowerCase() === '/' + path;
      });

    // if (isEmpty(find)) return { check: false };

    find = { ...find, ...{ Pname: principal, icon } };
    return !isEmpty(find)
      ? { check: find.path?.toLowerCase() === '/' + path, data: find }
      : false;
  };
  const checkRouter = (path) => {
    const { check, data } = findExpecificRoute(path);
    return <AdminLayout pageinfo={data} />;
  };

  return checkRouter(path);
};

export default MainLayout;
