import { get, post } from "./api";

const BASE_URL = "https://api.customerglu.com";

export const requestToken = async (
  writeKey: string,
  userId: string
): Promise<string> => {
  try {
    const res = await post<IDeviceRegistrationResponse>(
      `${BASE_URL}/user/v1/user/sdk?token=true`,
      {
        writeKey,
        userId,
      }
    );
    if (!res.parsedBody) throw "Error";
    return res.parsedBody.data.token;
  } catch (e) {
    throw e;
  }
};

export const requestUserData = async (
  token: string
): Promise<IUserCampaignsResponse> => {
  try {
    const res = await get<IUserCampaignsResponse>(
      `${BASE_URL}/reward/v1.1/user`,
      token
    );
    console.log(res.parsedBody);
    if (!res.parsedBody) throw "Error";
    return res.parsedBody;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

interface IUserCampaignsResponse {
  success: boolean;
  defaultUrl: string;
  campaigns: any;
}

interface IDeviceRegistrationResponse {
  success: boolean;
  data: {
    token: string;
  };
}
