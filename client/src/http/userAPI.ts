import { host } from ".";

export const registration = async (email: string, password: string) => {
  try {
    const response = await host.post("/auth/registration", {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await host.post("/auth/login", {
      email,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const check = async () => {
  return {};
  //const response = await host.post("api/auth");
  //return response;
};
