type CreateScriptRequest = {
  title: string;
  content: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

export const createScript = async ({
  title,
  content,
  contact_name,
  contact_email,
  contact_phone,
}: CreateScriptRequest) => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/script`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact_name,
      contact_email,
      contact_phone,
      title,
      content,
    }),
  });

  return response;
};
