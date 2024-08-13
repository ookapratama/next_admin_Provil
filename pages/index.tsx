import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import Button, { ButtonGroup } from '@call-components/bootstrap/Button';
import PageWrapper from '@call-layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '@call-root-lib/menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '@call-layout/SubHeader/SubHeader';
import CommonAvatarTeam from '@call-common/partial/other/CommonAvatarTeam';
import ThemeContext from '@call-context/themeContext';
import useDarkMode from '@call-hooks/useDarkMode';
import { TABS, TTabs } from '@call-common/type/helper';
import Page from '@call-layout/Page/Page';
import CommonDashboardAlert from '@call-common/partial/CommonDashboardAlert';
import CommonDashboardUserCard from '@call-common/partial/CommonDashboardUserCard';
import CommonDashboardMarketingTeam from '@call-common/partial/CommonDashboardMarketingTeam';
import CommonDashboardDesignTeam from '@call-common/partial/CommonDashboardDesignTeam';
import CommonDashboardIncome from '@call-common/partial/CommonDashboardIncome';
import CommonDashboardRecentActivities from '@call-common/partial/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from '@call-common/partial/CommonDashboardUserIssue';
import CommonDashboardSalesByStore from '@call-common/partial/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from '@call-common/partial/CommonDashboardWaitingAnswer';
import CommonDashboardTopSeller from '@call-common/partial/CommonDashboardTopSeller';
import CommonMyWallet from '@call-common/partial/CommonMyWallet';
import Cookies from 'js-cookie';
import { GetTokenLogin } from '@call-root-lib/services/AuthServices/AuthService';

const Index: NextPage = () => {
	const { mobileDesign } = useContext(ThemeContext);
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			localStorage.getItem('tourModalStarted') !== 'shown' &&
			!mobileDesign
		) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => { };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { themeStatus } = useDarkMode();

	const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

	// get Token
	const { token, loadToken } = GetTokenLogin();
	console.log(token);
	useEffect(() => {
		loadToken();
	}, [loadToken])

	return (
		<PageWrapper>
			<Head>
				<title>{demoPagesMenu.sales.subMenu.dashboard.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<span className='h4 mb-0 fw-bold'>Overview</span>
					<SubheaderSeparator />
					<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<CommonDashboardAlert />
					</div>

					<div className='col-xl-4'>
						<CommonDashboardUserCard />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardMarketingTeam />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardDesignTeam />
					</div>

					<div className='col-xxl-6'>
						<CommonDashboardIncome activeTab={activeTab} />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardUserIssue />
					</div>

					<div className='col-xxl-8'>
						<CommonDashboardSalesByStore />
					</div>
					<div className='col-xxl-4 col-xl-6'>
						<CommonDashboardWaitingAnswer />
					</div>

					<div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div>
					<div className='col-xxl-8'>
						<CommonDashboardTopSeller />
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
