class TokenServices {
  static async validateToken(token: string, type: String) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/tokens/validate`, {
	  method: 'POST',
	  body: JSON.stringify({ token, type }),
	  headers: { 'Content-Type': 'application/json' },
	});
	return await response.json();
  }
}

export default TokenServices;