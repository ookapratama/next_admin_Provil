import axios from 'axios';

const axiosBase = axios.create({
	baseURL: "/api",
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosBase;
