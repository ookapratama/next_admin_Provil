import React from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dayjs from 'dayjs';
import useDarkMode from '@call-hooks/useDarkMode';
import PageWrapper from '@call-layout/PageWrapper/PageWrapper';
import { adminMenu } from '@call-root-lib/menu';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '@call-layout/SubHeader/SubHeader';
import Icon from '@call-components/icon/Icon';
import Button from '@call-components/bootstrap/Button';
import Page from '@call-layout/Page/Page';
import CommonRab from '@call-common/partial/CommonRab';

const Index: NextPage = () => {
    const { themeStatus } = useDarkMode();
    return (
        <PageWrapper>
            <Head>
                <title>{adminMenu.projects.subMenu.rab.text}</title>
            </Head>
           
            <Page container='fluid'>
                <div className='row h-100'>
                    <div className='col-12'>
                        <CommonRab isFluid />
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
