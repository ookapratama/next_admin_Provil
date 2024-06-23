import React from 'react';
import Header, { HeaderLeft } from '@call-layout/Header/Header';
import Navigation from '@call-layout/Navigation/Navigation';
import { pageLayoutTypesPagesMenu } from '@call-root-lib/menu';
import useDeviceScreen from '@call-hooks/useDeviceScreen';
import CommonHeaderRight from './CommonHeaderRight';

const PageLayoutHeader = () => {
	// @ts-ignore
	const deviceScreen = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft>
				<Navigation
					menu={{
						...pageLayoutTypesPagesMenu.pageLayout.subMenu,
						...pageLayoutTypesPagesMenu.asideTypes.subMenu,
					}}
					id='header-top-menu'
					horizontal={
						!!deviceScreen?.width &&
						deviceScreen.width >= Number(process.env.NEXT_PUBLIC_MOBILE_BREAKPOINT_SIZE)
					}
				/>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default PageLayoutHeader;
