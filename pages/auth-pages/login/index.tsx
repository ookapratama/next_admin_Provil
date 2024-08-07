import React, { FC, useCallback, useContext, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import classNames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import AuthContext from '@call-context/authContext';
import useDarkMode from '@call-hooks/useDarkMode';
import USERS, { getUserDataWithUsername } from '@call-common/data/userDummyData';
import PageWrapper from '@call-layout/PageWrapper/PageWrapper';
import Page from '@call-layout/Page/Page';
import Card, { CardBody } from '@call-components/bootstrap/Card';
import Logo from '@call-components/Logo';
import Button from '@call-components/bootstrap/Button';
import Alert from '@call-components/bootstrap/Alert';
import FormGroup from '@call-components/bootstrap/forms/FormGroup';
import Input from '@call-components/bootstrap/forms/Input';
import Spinner from '@call-components/bootstrap/Spinner';
import { LoginAuth, RegisterStore } from '@call-services/AuthService';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Silahkan Register,</div>
				<div className='text-center h4 text-muted mb-5'>
					Register untuk mengakses website!
				</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Selamat Datang,</div>
			<div className='text-center h4 text-muted mb-5'>Silahkan Login!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: NextPage<ILoginProps> = ({ isSignUp }) => {
	const router = useRouter();

	const { setUser } = useContext(AuthContext);

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	// console.log('status : ', singUpStatus);

	const [password, setPassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');

	const handleOnClick = useCallback(() => router.push('/'), [router]);

	const handleRegister = (e: any) => {
		e.preventDefault();

		// const formData = new FormData(e.target);
		console.log(e);
		formikRegister.handleSubmit(e);
	};

	const handleLogin = (e: any) => {
		e.preventDefault();

		formik.handleSubmit(e);

	};

	const usernameCheck = (username: string) => {
		return !!getUserDataWithUsername(username);
	};

	const passwordCheck = (username: string, password: string) => {
		return getUserDataWithUsername(username).password === password;
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			} else if (values.loginPassword.length < 6) {
				errors.loginPassword = 'Password must be at least 6 characters';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			console.log(values);
			// if (usernameCheck(values.loginUsername)) {
			// 	if (passwordCheck(values.loginUsername, values.loginPassword)) {
			// 		if (setUser) {
			// 			setUser(values.loginUsername);
			// 		}

			// 		// handleOnClick();
			// 	} else {
			// 		formik.setFieldError('loginPassword', 'Username and password do not match.');
			// 	}
			// }
		},
	});

	const formikRegister = useFormik({
		enableReinitialize: true,
		initialValues: {
			valueEmail: '',
			valuePassword: '',
		},
		validate: (values) => {
			const errors: { valueEmail?: string; valuePassword?: string } = {};
			if (!values.valueEmail) {
				errors.valueEmail = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.valueEmail)) {
				errors.valueEmail = 'Invalid email address';
			}
			if (!values.valuePassword) {
				errors.valuePassword = 'Required';
			} else if (values.valuePassword.length < 6) {
				errors.valuePassword = 'Password must be at least 6 characters';
			}
			return errors;
		},
		validateOnChange: false,
		
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			if (
				!Object.keys(USERS).find(
					(f) => USERS[f].username.toString() === formik.values.loginUsername,
				)
			) {
				formik.setFieldError('loginUsername', 'No such user found in the system.');
			} else {
				setSignInPassword(true);
			}
			setIsLoading(false);
		}, 1000);
	};

	return (
		<PageWrapper
			isProtected={false}
			className={classNames({ 'bg-dark': !singUpStatus, 'bg-light': singUpStatus })}>
			<Head>
				<title>{singUpStatus ? 'Register' : 'Login'}</title>
			</Head>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										href='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Register
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								{/* <Alert isLight icon='Lock' isDismissible>
									<div className='row'>
										<div className='col-12'>
											<strong>Email:</strong> nama@gmail.com
										</div>
										<div className='col-12'>
											<strong>Password:</strong> ********
										</div>
									</div>
								</Alert> */}

								<form
									onSubmit={singUpStatus ? handleRegister : handleLogin}
									className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													label='Your email'>
													<Input
														type='email'
														value={formikRegister.values.valueEmail}
														onChange={formikRegister.handleChange}
														isTouched={formikRegister.touched.valueEmail}
														invalidFeedback={formikRegister.errors.valueEmail}
														onBlur={formikRegister.handleBlur}
														name='valueEmail'
														autoComplete='email'
													/>
												</FormGroup>
											</div>
											{/* <div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Your name'>
													<Input autoComplete='given-name' />
												</FormGroup>
											</div> */}
											{/* <div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your surname'>
													<Input autoComplete='family-name' />
												</FormGroup>
											</div> */}
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													
													label='Password'>
													<Input
														value={formikRegister.values.valuePassword}
														onChange={formikRegister.handleChange}
														isTouched={formikRegister.touched.valuePassword}
														invalidFeedback={formikRegister.errors.valuePassword}
														onBlur={formikRegister.handleBlur}
														type='password'
														name='valuePassword'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													type='submit'
													color='info'
													className='w-100 py-3'>
													Register
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='loginUsername'
													label='Your email'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='username'
														type='email'
														value={formik.values.loginUsername}
														isTouched={formik.touched.loginUsername}
														invalidFeedback={
															formik.errors.loginUsername
														}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
												{signInPassword && (
													<div className='text-center h4 mb-3 fw-bold'>
														Hi, {formik.values.loginUsername}.
													</div>
												)}
												<FormGroup
													id='loginPassword'
													label='Password'
													className={classNames({
														'd-none': signInPassword,
														
													})}>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.loginPassword}
														isTouched={formik.touched.loginPassword}
														invalidFeedback={
															formik.errors.loginPassword
														}
														validFeedback='Looks good!'
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														// isDisable={!formik.values.loginUsername}
														// onClick={handleContinue}
														type='submit'>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Login
													</Button>
												) : (
													<Button
														color='warning'
														className='w-100 py-3'
														type='submit'
														// onClick={formik.handleSubmit}
													>
														Login
													</Button>
												)}
											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<Link
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Privacy policy
							</Link>
							<Link
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Terms of use
							</Link>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Login;
