import { HttpsProxyAgent } from "https-proxy-agent";

class UserService {


	static async login(credentials: {password: string, email: string}) {
	  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
		method: 'POST',
		body: JSON.stringify(credentials),
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
	  });
	  return await response.json();
	}

	static async me() {
	  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
	  });
	  const data = await response.json();
	  console.log(data); // Log the response data
	  return data;
	}
}
  
  export default UserService;