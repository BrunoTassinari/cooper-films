type LoginRequest = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginRequest) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
};
