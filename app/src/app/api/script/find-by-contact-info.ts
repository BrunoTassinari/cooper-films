type findScriptQuery = {
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
};

export const findScript = async ({
  contact_name,
  contact_email,
  contact_phone,
}: findScriptQuery) => {
  let query = '?';

  if (contact_name) query += `contact_name=${contact_name}`;

  if (contact_email) query += `&contact_email=${contact_email}`;

  if (contact_phone) query += `&contact_phone=${contact_phone}`;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script${query}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
