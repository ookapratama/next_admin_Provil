import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PageWrapper from '@call-layout/PageWrapper/PageWrapper';
import { adminMenu } from '@call-root-lib/menu';
import Page from '@call-layout/Page/Page';
import CommonCluster from '@call-common/partial/CommonCluster';

const Index: NextPage = () => {
	return (
		<PageWrapper>
			<Head>
				<title>{adminMenu.marketing.subMenu.cluster.text}</title>
			</Head>
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<CommonCluster isFluid />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Index;
