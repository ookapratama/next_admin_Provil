import axiosBase from '../axiosBase';

// interface RegisterDataProps {
//     name: string;
//     email: string;
//     password: string;
//     phone_num: string;
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
		console.log(response)
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
	console.log('Login ');
};

// export default RegisterStore
