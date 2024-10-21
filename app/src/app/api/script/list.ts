export const ListScripts = async () => {
  let token = localStorage.getItem('authToken');

  if (!token) token = '{}';

  const parsedToken = JSON.parse(token);

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script/list`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${parsedToken}`,
    },
  });

  return response;
};
