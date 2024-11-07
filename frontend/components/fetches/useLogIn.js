// export const useLogIn = async (contactData) => {
//   const response = await fetch(`api/login`, { //need to clarify
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(contactData),
//   });
//   console.log(response)

//   if (!response.ok) {
//     let errorData;
//     try {
//       errorData = await response.json();
//     } catch {
//       errorData = { message: "Failed to parse error message" };
//     }
//     throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
//   } else {
//     const responseData = await response.json();
//     console.log("Success:", responseData);
//   }
// };

export const useLogIn = async (contactData) => {
  
  console.log("Sending data:", contactData);

  const response = {
    ok: true,  
    status: 200,
    json: async () => ({ message: "Successfully sent!" }),
  };

  // Log the response to the console
  console.log("Response:", response);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: "Failed to parse error message" };
    }
    throw new Error(`Error ${response.status}: ${errorData.message || 'Unknown error'}`);
  } else {
    // If everything is okay, log the success response
    const responseData = await response.json();
    console.log("Success:", responseData);
  }
};