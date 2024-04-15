import { CapacitorHttp, HttpOptions, HttpResponse } from "@capacitor/core";
import requestHandler from "./requestHandler";

const baseURL =
  (import.meta.env.VITE_API_BASEURL || "https://d1d9tq69-3333.usw3.devtunnels.ms/") + "api/v1/";

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
  console.log(data)
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
  const options: HttpOptions = {
    url: baseURL + "users/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  };
  const { data }: HttpResponse["data"] = await CapacitorHttp.post(options)
    .finally(() => {
      isLoading && isLoading(false);
    });
  return data;
};
export const logout = async () => {};
