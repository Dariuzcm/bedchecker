import requestHandler from "./requestHandler";

export const loginAction = async (
  email: string,
  password: string,
  isLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  isLoading && isLoading(true);
  const { data } = await requestHandler
    .post("/users/login", {
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
