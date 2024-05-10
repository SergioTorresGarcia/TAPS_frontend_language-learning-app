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
  console.log(credenciales);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credenciales),
  };

  try {
    const response = await fetch(`${root}auth/login`, options);
    if (!response) {
      throw new Error("User not found");
    }
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

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
// All levels
export const GetLevels = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}levels`, options);

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

// All words
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

// the very first word
export const GetOneWord = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}words/first`, options);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  } catch (error) {
    throw error;
  }
};

// 10 words from level
export const GetWordsFromLevel = async (token, level_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}words/level/${level_id}`, options);

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


export const GetWordsFromLevelToDivert = async (token, level_id) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}words/level/diversion/${level_id}`, options);

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


//words/current
export const GetWordToPlay = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    // const response1 = await fetch(`${root}words`, options);
    // if (!response1.ok) {
    //   throw new Error('Failed to fetch data');
    // }
    // const data1 = await response1.json();
    // const wordZero = data1.data[0]
    // console.log(wordZero);

    const response = await fetch(`${root}words/current`, options);
    console.log(`${root}words/current`);
    if (!response.ok) {
      const data = await fetch(`${root}words`, options);
      console.log(data);
      return data
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    console.log(data);
    console.log(data.data);
    return data.data || wordZero;
  } catch (error) {
    throw error;
  }
};

//words/learnt
export const GetWordsLearnt = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${root}words/learnt`, options);

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

//words/current-level


export const SetUpWordAsLearnt = async (token, wordId) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ wordId })
  };

  try {
    const response = await fetch(`${root}words/add-to-learnt`, options);

    if (!response.ok) {
      throw new Error('Failed to add user word');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    console.log("User word added successfully:", data);
    return data;
  } catch (error) {
    console.error('Error adding user word:', error);
    throw error;
  }
};

