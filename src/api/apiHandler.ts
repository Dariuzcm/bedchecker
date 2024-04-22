import { Token, User } from "../types/userTypes";
import { capitalize } from "../utils/utils";
import requestHandler from "./requestHandler";

//import { CapacitorHttp, HttpOptions, HttpResponse } from "@capacitor/core";
//const baseURL = (import.meta.env.VITE_API_BASEURL || "https://d1d9tq69-3333.usw3.devtunnels.ms/") + "api/v1/";

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
  const accessToken = user.token

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

    if(status !== 204) {
      throw Error('Something whent wrong on create validation token')
    }
  } catch (error) {
    throw Error("Something whent wrong, Network Error");
  } finally {
    isLoading && isLoading(false);
  }
};
// export const capacitorLoginAction = async (
//   email: string,
//   password: string,
//   isLoading?: React.Dispatch<React.SetStateAction<boolean>>
// ) => {
//   isLoading && isLoading(true);
//   const options: HttpOptions = {
//     url: baseURL + "users/login",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     data: {
//       email,
//       password,
//     },
//   };
//   const { data }: HttpResponse["data"] = await CapacitorHttp.post(options)
//     .finally(() => {
//       isLoading && isLoading(false);
//     });
//   return data;
// };
