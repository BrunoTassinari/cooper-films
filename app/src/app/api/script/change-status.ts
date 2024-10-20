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
  const token = JSON.parse(localStorage.getItem('authToken') || '');

  if (!token) {
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      script_id,
      user_id,
      status,
      observation,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to change status');
  }

  return response.json();
};
