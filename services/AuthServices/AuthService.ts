import axiosBase from '../axiosBase';

// interface RegisterDataProps {
//     name: string;
//     email: string;
//     password: string;
//     phone_num: string;
// }

export const RegisterStore = async (formData: FormData) => {
	// console.log(axiosBase)
	const fields = {
		name: formData.valueName,
		email: formData.valueEmail,
		password: formData.valuePassword,
		phone_number: formData.valuePhoneNumber,
	};
	// console.log(fields);

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
	}

	// const res = await axiosBase
	// 	.post('/auth/register', fields)
	// 	.then((response) => {
	// 		// Handle success.
	// 		console.log('Well done!');
	// 		console.log('User profile', response.data);
	// 	})
	// 	.catch((error) => {
	// 		// Handle error.
	// 		console.log('An error occurred:', error);
	// 	});
	// console.log(res);
};

export const LoginAuth = async (formData: FormData) => {
	console.log('Login ');
};

// export default RegisterStore
