import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
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
import { GetTokenLogin, LoginAuth, RegisterStore } from '@call-root-lib/services/AuthServices/AuthService';
import Toasts from '@call-components/bootstrap/Toasts';
import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';

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

// alert register
interface IAlertRegisterProps {
	isRegister?: boolean;
	email?: string;
}

const AlertRegister = ({ isRegister, email }: IAlertRegisterProps) => {
	const alertOptions = {
		icon: isRegister ? 'success' : 'error',
		title: isRegister ? 'Sukses Registrasi' : 'Gagal Registrasi',
		message: isRegister ? `Silahkan login menggunakan akun anda : ${email}` : 'Email sudah terdaftar',
	};

	withReactContent(Swal).fire({
		icon: alertOptions.icon,
		title: alertOptions.title,
		text: alertOptions.message,
	})


};

// alert login
interface IAlertLoginProps {
	isRegister?: boolean;
	name?: string;
}

const AlertLogin = ({ isRegister, name }: IAlertLoginProps) => {
	const alertOptions = {
		icon: isRegister ? 'success' : 'error',
		title: isRegister ? 'Sukses Login' : 'Gagal Login',
		message: isRegister ? `Selamat datang, ${name}` : 'Periksa kembali email dan password anda',
	};

	withReactContent(Swal).fire({
		icon: alertOptions.icon,
		title: alertOptions.title,
		text: alertOptions.message,
	})


};


interface ILoginProps {
	isSignUp?: boolean;
}
const Login: NextPage<ILoginProps> = ({ isSignUp }) => {
	const router = useRouter();

	const { darkModeStatus } = useDarkMode();

	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// get Token
	const { token, setToken } = GetTokenLogin();
	console.log('token : ', token);

	const handleRegister = (e: any) => {
		e.preventDefault();
		formikRegister.handleSubmit(e);
	};

	// const navigate = useNavigate();
	// const handleOnClick = useCallback(() => navigate("/"), [navigate]);
	const handleLogin = (e: any) => {
		e.preventDefault();
		formik.handleSubmit(e);
	};


	// handle form Login
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
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.loginUsername)) {
				errors.loginUsername = 'Invalid email address';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			} else if (values.loginPassword.length < 6) {
				errors.loginPassword = 'Password minimal 6 characters';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: async (values, { resetForm }) => {
			setIsLoading(true)
			const isLogin = await LoginAuth(values);
			if (isLogin?.status === 200) {
				// resetForm();
				try {
					const token = isLogin.data.data.accessToken;
					setToken(token);
					Cookies.set('token', token)
					AlertLogin({ isRegister: true, name: values.loginUsername });
					router.push('/')
				} catch (error) {	
					console.log(error);
				}
				setIsLoading(false)
			} else {
				AlertLogin({ isRegister: false });
				setIsLoading(false)
			}
		},
	});

	// handle form register
	const formikRegister = useFormik({
		enableReinitialize: true,
		initialValues: {
			valueEmail: '',
			valuePassword: '',
			valuePhoneNumber: '',
			valueName: '',
		},
		validate: (values) => {
			const errors: {
				valueEmail?: string;
				valuePassword?: string;
				valueName?: string;
				valuePhoneNumber?: string;
			} = {};
			if (!values.valueEmail) {
				errors.valueEmail = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.valueEmail)) {
				errors.valueEmail = 'Invalid email address';
			}
			if (!values.valuePassword) {
				errors.valuePassword = 'Required';
			} else if (values.valuePassword.length < 6) {
				errors.valuePassword = 'Password minimal 6 characters';
			}
			if (!values.valueName) {
				errors.valueName = 'Required';
			}
			if (!values.valuePhoneNumber) {
				errors.valuePhoneNumber = 'Required';
			} else if (values.valuePhoneNumber.length < 10) {
				errors.valuePhoneNumber = 'No HP minimal 10 characters';
			} else if (values.valuePhoneNumber.length > 16) {
				errors.valuePhoneNumber = 'No HP maksimal 16 characters';
			}
			return errors;
		},
		validateOnChange: false,

		onSubmit: async (values, { resetForm }) => {
			setIsLoading(true)
			const isRegis = await RegisterStore(values);
			formik.resetForm();
			if (isRegis?.status === 200) {
				resetForm();
				setSingUpStatus(!singUpStatus);
				AlertRegister({ isRegister: true, email: values.valueEmail });
				setIsLoading(false)
			} else {
				setSingUpStatus(singUpStatus);
				AlertRegister({ isRegister: false });
				setIsLoading(false)
			}
		},
	});


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
													formikRegister.resetForm();
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
													formik.resetForm();
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
												<FormGroup id='signup-name' label='Nama Lengkap'>
													<Input
														autoComplete='given-name'
														name='valueName'
														placeholder='Masukkan nama lengkap'
														value={formikRegister.values.valueName}
														onChange={formikRegister.handleChange}
														isTouched={formikRegister.touched.valueName}
														invalidFeedback={
															formikRegister.errors.valueName
														}
														onBlur={formikRegister.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup id='signup-email' label='Your email'>
													<Input
														type='email'
														placeholder='Masukkan email'
														value={formikRegister.values.valueEmail}
														onChange={formikRegister.handleChange}
														isTouched={
															formikRegister.touched.valueEmail
														}
														invalidFeedback={
															formikRegister.errors.valueEmail
														}
														onBlur={formikRegister.handleBlur}
														name='valueEmail'
														autoComplete='email'
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup id='signup-surname' label='No. HP'>
													<Input
														id='examplePrice'
														placeholder='Format +62'
														// @ts-ignore
														value={
															formikRegister.values.valuePhoneNumber
														}
														onChange={formikRegister.handleChange}
														isTouched={
															formikRegister.touched.valuePhoneNumber
														}
														invalidFeedback={
															formikRegister.errors.valuePhoneNumber
														}
														onBlur={formikRegister.handleBlur}
														type='text'
														name='valuePhoneNumber'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup id='signup-password' label='Password'>
													<Input
														value={formikRegister.values.valuePassword}
														onChange={formikRegister.handleChange}
														isTouched={
															formikRegister.touched.valuePassword
														}
														invalidFeedback={
															formikRegister.errors.valuePassword
														}
														onBlur={formikRegister.handleBlur}
														type='password'
														name='valuePassword'
														placeholder='Masukkan password'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													type='submit'
													color='info'
													className='w-100 py-3'
												>
													{isLoading && (
														<Spinner isSmall inButton isGrow />
													)}
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
														autoComplete='email'
														placeholder='Masukkan email'
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
													className={'mt-3'}>
													<Input
														type='password'
														placeholder='Masukkan password'
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
														className='w-100 py-3 '
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
