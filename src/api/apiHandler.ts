import requestHandler from "./requestHandler";

export const getAll = async () => {
  const response = await requestHandler.get("/pokemon");
  return response.data;
};

export const loginAction = async (
  email: string,
  password: string,
  isLoading?: (React.Dispatch<React.SetStateAction<boolean>>)
) => {
  isLoading && isLoading(true)
  setTimeout(() => {
    console.log({ email, password });
    isLoading && isLoading(false)
  }, 5000);
  return true;
};
