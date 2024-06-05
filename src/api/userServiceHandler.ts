import { Token, User, UserFields } from "../types/userTypes";
import { capitalize } from "../utils/utils";
import requestHandler from "./requestHandler";

export const loginAction = async (
  email: string,
  password: string,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  isLoading && isLoading(true);
  const { data } = await requestHandler
    .post("users/login", {
      email,
      password,
    })
    .then((res) => {
      if (res.status > 299) {
        throw Error("Something whent wrong");
      }
      return res;
    })
    .finally(() => {
      isLoading && isLoading(false);
    });

  return {
    user: data.user,
    token: data.token,
  };
};

export const logoutAction = async (
  accessToken: Token,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  isLoading && isLoading(true);
  try {
    const response = await requestHandler.post(
      "users/logout",
      {},
      {
        headers: {
          Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
        },
      }
    );
    if (response.status > 300) {
      throw Error("Something whent wrong");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw Error("Something whent wrong, Network Error");
  } finally {
    isLoading && isLoading(false);
  }
};

export const registration = async (
  user: Partial<User>,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  isLoading && isLoading(true);
  try {
    const { data, status } = await requestHandler.post("users/create", {
      ...user,
    });
    if (status > 299) throw Error("Something whent wrong, status" + status);
    return data;
  } catch (error) {
    throw Error("Something whent wrong, Network Error");
  } finally {
    isLoading && isLoading(false);
  }
};

export const createToken = async (
  user: User,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!user.token) throw Error("No Token Exception");
  isLoading && isLoading(true);
  const accessToken = user.token;

  try {
    const { status } = await requestHandler.post(
      "validation/create",
      {},
      {
        headers: {
          Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
        },
      }
    );

    if (status !== 204) {
      throw Error("Something whent wrong on create validation token");
    }
  } catch (error) {
    throw Error("Something whent wrong, Network Error");
  } finally {
    isLoading && isLoading(false);
  }
};

export const validateVerificationToken = async (
  token: string,
  user: User,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!user.token) throw Error("No Token Exception");
  isLoading && isLoading(true);
  const accessToken = user.token;

  try {
    const { status } = await requestHandler.post(
      "validation/validate",
      { verificationToken: token },
      {
        headers: {
          Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
        },
      }
    );

    if (status !== 204) {
      throw Error("Something whent wrong on create validation token");
    }
  } catch (error) {
    throw Error("Something whent wrong, Network Error");
  } finally {
    isLoading && isLoading(false);
  }
};

export const refreshUser = async (user: User) => {
  if (!user.token) throw Error("No Token Exception");
  const accessToken = user.token;

  try {
    const { status, data } = await requestHandler.get("users/me", {
      headers: {
        Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      },
    });

    if (status > 299) {
      throw Error("Something whent wrong on create validation token");
    }
    return data;
  } catch (error) {
    throw Error("Something whent wrong, Network Error");
  }
};

export const updateUser = async (user: User) => {
  if (!user.token) throw Error("No Token Exception");
  const accessToken = user.token;
  try {
    const { status, data } = await requestHandler.put("users", (user as UserFields), {
      headers: {
        Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      },
    });

    if (status > 299) {
      throw Error("Something whent wrong on update user");
    }
    return data;
  } catch (e) {
    throw Error("Something whent wrong, Network Error");
  }
};

export const updatePhoto = async (user: User, photo: Blob) => {
  if (!user.token) throw Error("No Token Exception");
  const accessToken = user.token;

  const formData = new FormData()
  formData.append('avatar', photo)

  const { status, data } = await requestHandler.post("users/photo", formData, {
    headers: {
      Authorization: `${capitalize(accessToken.type)} ${accessToken.token}`,
      'Content-Type': 'multipart/form-data',
    }
  })
  if (status > 299) {
    throw Error("Something whent wrong on create validation token");
  }
  return data;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deletePhoto = async (_user: User) => {
  throw new Error("Not supported yet")  
}