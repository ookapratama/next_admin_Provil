import React, { useContext } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Brand from '@call-layout/Brand/Brand';
import Navigation, { NavigationLine } from '@call-layout/Navigation/Navigation';
import User from '@call-layout/User/User';
import { adminMenu, dashboardPagesMenu } from '@call-root-lib/menu';
import ThemeContext from '@call-context/themeContext';

import Aside, { AsideBody, AsideFoot, AsideHead } from '@call-layout/Aside/Aside';

const AdminSidebar = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
				<>
					{/* <NavigationLine />
					<Navigation menu={demoPagesMenu} id='aside-demo-pages' />
					<NavigationLine />
					<Navigation menu={pageLayoutTypesPagesMenu} id='aside-menu' /> */}
					<NavigationLine />
					<Navigation menu={adminMenu} id='aside-menu-lahan' />
				</>
			</AsideBody>
			<AsideFoot>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default AdminSidebar;
