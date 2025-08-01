import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

// export const login = async (loginData) => {
//   const response = await axiosInstance.post("/auth/login", loginData);
//   return response.data;
// };

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);

  // ✅ Store token in localStorage
  const token = response.data.token;
  if (token) {
    localStorage.setItem("authToken", token);
  }

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

// export const getAuthUser = async () => {
//   try {
//     const res = await axiosInstance.get("/auth/me");
//     return res.data;
//   } catch (error) {
//     console.log("Error in getAuthUser:", error);
//     return null;
//   }
// };

export const getAuthUser = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.log("Login: Token found in response data:", token); // Should show the token string
    localStorage.setItem("authToken", token);
    console.log(
      "Login: Token successfully stored in localStorage as 'authToken'."
    );
    console.log(
      "Login: Verify 'authToken' in localStorage IMMEDIATELY:",
      localStorage.getItem("authToken"),
      console.log("No token found"));
      return null;
    }
          console.log(
            "Login: WARNING! 'token' property NOT found in response.data."
          );


    const res = await axiosInstance.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error.response?.data || error.message);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}
