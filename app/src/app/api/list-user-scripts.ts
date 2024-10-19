export const ListUserScripts = async (userid: string) => {
  const token = JSON.parse(localStorage.getItem('authToken') || '');

  if (!token) {
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script/user/list/${userid}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  if (!response.ok) {
    throw new Error('Failed to list scripts');
  }

  return response.json();
};
