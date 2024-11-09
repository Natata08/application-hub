export const useLogIn = async (contactData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "Failed to parse error message" };
    }
    throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
  }
};