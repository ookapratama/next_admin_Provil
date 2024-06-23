import React from 'react';
import Header, { HeaderLeft } from '@call-layout/Header/Header';
import CommonHeaderChat from './CommonHeaderChat';
import Search from '@call-components/Search';
import CommonHeaderRight from './CommonHeaderRight';

const DashboardHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<Search />
			</HeaderLeft>
			<CommonHeaderRight afterChildren={<CommonHeaderChat />} />
		</Header>
	);
};

export default DashboardHeader;
