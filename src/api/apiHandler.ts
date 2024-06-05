

//import { CapacitorHttp, HttpOptions, HttpResponse } from "@capacitor/core";
//const baseURL = (import.meta.env.VITE_API_BASEURL || "https://d1d9tq69-3333.usw3.devtunnels.ms/") + "api/v1/";



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
