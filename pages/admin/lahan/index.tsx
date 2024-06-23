import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dayjs from 'dayjs';
import useDarkMode from '@call-hooks/useDarkMode';
import PageWrapper from '@call-layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '@call-root-lib/menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '@call-layout/SubHeader/SubHeader';
import Icon from '@call-components/icon/Icon';
import Button from '@call-components/bootstrap/Button';
import Page from '@call-layout/Page/Page';
import CommonUpcomingEvents from '@call-common/partial/CommonUpcomingEvents';

const Index: NextPage = () => {
	const { themeStatus } = useDarkMode();
	return (
		<PageWrapper>
			<Head>
				<title>{demoPagesMenu.appointment.subMenu.appointmentList.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						You have <Icon icon='TaskAlt' color='success' className='mx-1' size='lg' />{' '}
						3 approved appointments and{' '}
						<Icon icon='Alarm' color='warning' className='mx-1' size='lg' /> 4 pending
						appointments for today.
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button color={themeStatus}>
						{dayjs().format('MMM Do')} - {dayjs().add(7, 'days').format('MMM Do')}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<CommonUpcomingEvents isFluid />
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
