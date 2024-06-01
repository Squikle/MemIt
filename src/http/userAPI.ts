import { host } from ".";

export const registration = async (email: string, password: string) => {
  try {
    await host.post("uri/auth/registration", {
      email,
      password,
    });
    return { login: "test" };
    //return response.data;
  } catch (error) {
    console.log(error);
    return { token: "test" };
  }
};

export const login = async (email: string, password: string) => {
  try {
    await host.post("uri/auth/login", {
      email,
      password,
    });
    return { login: "test" };
    //return response.data;
  } catch (error) {
    console.log(error);
    return { token: "test" };
  }
};

export const check = async () => {
  return {};
  //const response = await host.post("api/auth");
  //return response;
};
