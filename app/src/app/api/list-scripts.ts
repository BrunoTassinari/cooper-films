export const ListScripts = async () => {
  const token = JSON.parse(localStorage.getItem('authToken') || '');

  if (!token) {
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script/list`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to list scripts');
  }

  return response.json();
};
