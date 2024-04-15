import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import requestHandler from "./requestHandler";

const baseURL = (import.meta.env.VITE_API_BASEURL || 'http://localhost:3333/' )+'api/v1/';

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
        console.error(res.data);
        throw Error("Something whent wrong");
      }
      return res;
    })
    .finally(() => {
      isLoading && isLoading(false);
    });
  return {
    user: data.user,
    token: data.token.token,
  };
};

export const capacitorLoginAction = async (
  email: string,
  password: string,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  isLoading && isLoading(true);
  const options = {
    url: baseURL,
    data: {
      email,
      password
    }
  }
  const response: HttpResponse = await CapacitorHttp.post(options)
  return response.data
};
export const logout = async () => {};
