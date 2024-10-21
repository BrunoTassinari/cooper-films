type CreateUserScriptRequest = {
  user_id: string;
  script_id: string;
  role: string;
};

export const createUserScript = async ({
  user_id,
  script_id,
  role,
}: CreateUserScriptRequest) => {
  const token = JSON.parse(localStorage.getItem('authToken') || '');

  if (!token) {
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script/user`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id,
      script_id,
      role,
    }),
  });

  return response;
};
