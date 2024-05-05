const root = "http://localhost:4500/";

export const RegisterUser = async (user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${root}auth/register`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (credenciales) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  };

  try {
    const response = await fetch(`${root}auth/login`, options);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }
    console.log(222, response);
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

export const GetProfile = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}users/me`, options);
    console.log(response);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateProfile = async (token, data) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${root}users/me`, options);

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (error) {
    return error;
  }
};


// GAME
export const GetWords = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}words`, options);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetWordToPlay = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}words/current`, options);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    console.log("data", data);
    console.log("response", response);
    return data;
  } catch (error) {
    throw error;
  }
};
