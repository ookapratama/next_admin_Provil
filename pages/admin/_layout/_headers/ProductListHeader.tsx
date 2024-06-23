import React from 'react';
import Header, { HeaderLeft } from '@call-layout/Header/Header';
import CommonHeaderRight from './CommonHeaderRight';
import Company1 from '@call-assets/logos/company1.png';

const ProductListHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={Company1} alt='Company' height={24} />
				<span>Products</span>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default ProductListHeader;
