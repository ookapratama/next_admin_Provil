import React from 'react';
import dynamic from 'next/dynamic';
import { demoPagesMenu, pageLayoutTypesPagesMenu, adminMenu } from '../menu';

// const DefaultAside = dynamic(() => import('../pages/admin/_layout/_asides/DefaultAside'));
const MenuAside = dynamic(() => import('../pages/admin/_layout/_asides/AdminSidebar'));

const asides = [
	{ path: demoPagesMenu.login.path, element: null, exact: true },
	{ path: demoPagesMenu.signUp.path, element: null, exact: true },
	{ path: pageLayoutTypesPagesMenu.blank.path, element: null, exact: true },
	{ path: adminMenu.projects.path, element: null, exact: true },
	// { path: '/*', element: <DefaultAside />, exact: true },
	{ path: '/*', element: <MenuAside />, exact: true },
];

export default asides;
