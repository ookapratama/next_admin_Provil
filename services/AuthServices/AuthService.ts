import axiosBase from '../axiosBase';
import { create } from 'zustand';

// interface RegisterDataProps {
//     name?: string;
//     email?: string;
//     password?: string;
//     phone_number?: string;
// }

export const RegisterStore = async (formData: FormData) => {
	const fields = {
		name: formData.valueName,
		email: formData.valueEmail,
		password: formData.valuePassword,
		phone_number: formData.valuePhoneNumber,
	};

	try {
		const response = await axiosBase.post('/auth/register', fields)
		return response
	} catch (error) {
		if (error.response) {
			console.log('Error Response:', error.response.data);
		} else if (error.request) {
			console.log('Error Request:', error.request);
		} else {
			console.log('Error:', error.message);
		}
		return error
	}
};

export const LoginAuth = async (formData: FormData) => {
	const fields = {
		email: formData.loginUsername,
		password: formData.loginPassword,
	}
	try {
		const response = await axiosBase.post('/auth/login', fields)
		return response
	} catch (error) {
		if (error.response) {
			console.log('Error Response:', error.response.data);
		} else if (error.request) {
			console.log('Error Request:', error.request);
		} else {
			console.log('Error:', error.message);
		}
		return error
	}
};

export const LogoutUser = async (data: string) => {
	console.log('logout : ', data);
	try {
		const response = await axiosBase.get(`/auth/logout?session_id=${data}`)
		return response
	} catch (error) {
		if (error.response) {
			console.log('Error Response:', error.response.data);
		} else if (error.request) {
			console.log('Error Request:', error.request);
		} else {
			console.log('Error:', error.message);
		}
		return error
	}
}

interface GetTokenProps {
	token: string | null;
	setToken: (token: string) => void;
	loadToken: () => void;
	clearToken: () => void;
}

export const GetTokenLogin = create<GetTokenProps>((set) => ({
	token: null,

	setToken: (token: string) => {
		try {
			localStorage.setItem('token', token)
			set({ token });
		} catch (error) {
			console.log('Error set token : ', error);
		}
	},
	loadToken: () => {
		try {
			const token = localStorage.getItem('token');
			set({ token })
		} catch (error) {
			console.log('Error load token : ', error);
		}
	},
	clearToken: () => {
		try {
			localStorage.removeItem('token')
			set({ token: null })
		} catch (error) {
			console.log('Error clear token : ', error);
		}
	}
}));