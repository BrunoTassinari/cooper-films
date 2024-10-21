type ChangeStatusRequest = {
  script_id: string;
  user_id: string;
  status: string;
  observation?: string;
};

export const changeScriptStatus = async ({
  script_id,
  user_id,
  status,
  observation,
}: ChangeStatusRequest) => {
  let token = localStorage.getItem('authToken');

  if (!token) token = '{}';

  const parsedToken = JSON.parse(token);

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parsedToken}`,
    },
    body: JSON.stringify({
      script_id,
      user_id,
      status,
      observation,
    }),
  });

  return response;
};
