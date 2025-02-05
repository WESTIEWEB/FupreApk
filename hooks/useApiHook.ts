import axios from "axios";
import React, { useContext } from "react";
import * as decode from 'jwt-decode'


import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAppStore from "@/Store/AppStore";


const link = 'https://fupreassets.com.ng/';

const UseApiUtils = () => {
    const [secT, setSecT] = React.useState(null)
    const { setTokenExpired } = useAppStore();


    const handleLogout = () => {
    }


    const checkTokenExpiry = async () => {
        let token: any;
        AsyncStorage.getItem('secured').then(token => token = token).catch((err) => console.warn(err))
        if (token) {
            console.log(token, 'checkExpiry')
            let cleanedToken = (token.includes('"') || token.includes("'"))? token.replace(/['"]/g, '') : token
            const decoded = decode.jwtDecode(cleanedToken) as any;
            const current = Date.now() / 1000;
      
            if (decoded.exp < current) {
              setTokenExpired(true);
              // Token has expired
              Alert.alert(
                'Session Expired',
                'Your session has expired. Please login again.',
                [
                  {
                    text: 'OK',
                    onPress: async () => {
                    },
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              );
              await handleLogout();
                
                return true;
              
          } else {
              console.log('error retrieving token');
          }
          
      }

      return false;
  };
    

    const instance = axios.create({
        timeout: 50000,
        baseURL: link,
        headers: {
            'Content-Type': 'application/json', // Default Content-Type
        },
        timeoutErrorMessage: "Connection Timeout", 
    });
    
    instance.interceptors.request.use(
        async (config) => {
            let token: any;
            AsyncStorage.getItem('secured').then(token => token = token).catch((err) => console.warn(err))
            if(token) {
                let cleanedToken = (token.includes('"') || token.includes("'"))? token.replace(/['"]/g, '') : token
                if(cleanedToken) {
                    config.headers.Authorization = `Bearer ${cleanedToken}`;
                } else {
                    console.log('token not valid')
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    instance.interceptors.response.use(
        async (response) => {
            return response;
        },
        async (error) => {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 403) {
                  if (error.response.status === 401) {
                    Alert.alert(
                      "Session Expired",
                      "Your session has expired. Please login again.",
                      [
                        {
                          text: "OK",
                          onPress: async () => {
                            AsyncStorage.removeItem('secured');
                          },
                          style: "cancel",
                        },
                      ],
                      { cancelable: false }
                    );
                    handleLogout();
                    return;
                  } else if (error.response.status === 403) {
                    Alert.alert(
                      "Invalid User",
                      "Your profile does not have access to this service.",
                      [
                        {
                          text: "OK",
                          onPress: async () => {
                            AsyncStorage.removeItem('secured');
                          },
                          style: "cancel",
                        },
                      ],
                      { cancelable: false }
                    );
                    handleLogout();
                    return;
                  }
                } else if (error.response.status === 409) {
                  console.log("Conflict occurred");
                }
        
                // if (error.response.status === 500) {
                //   Alert.alert("Error", "Something went wrong", [
                //     {
                //       text: "OK",
                //       onPress: () => {
                //         setValue(null);
                //         logout();
                //       },
                //       style: "cancel",
                //     },
                //   ]);
                // }
        
                if (error.response.status === 409) {
                  console.log("Conflict");
                }
              } else if (error.request) {
                // No response was received from the server (Network issues)
                if (error.message === "Network Error") {
                  Alert.alert(
                    "Network Error",
                    "There was a network error. Please check your internet connection.",
                    [{ text: "OK", style: "cancel" }]
                  );
                }
              } else {
                // General error like timeout
                if (
                  error.code === "ECONNABORTED" &&
                  error.message.includes("timeout")
                ) {
                  Alert.alert(
                    "Request Timeout",
                    "The request took too long and timed out. Please try again.",
                    [{ text: "OK", style: "cancel" }]
                  );
                }
              }
            
            return Promise.reject(error);
        }
    );
    
    const ApiUtils = {
      get: async (url: string) => {
        console.log(url)
        const source = axios.CancelToken.source();
        checkTokenExpiry();
        try {
          const response = await instance.get(url, { cancelToken: source.token });
          return response;
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            throw error;
          }
        }
      },
  
      post: async (url: string, data: Record<string, any>) => {
        console.log(url, data);
        const source = axios.CancelToken.source();
        checkTokenExpiry();
        try {
          const response = await instance.post(url, data, {
            cancelToken: source.token,
          });
          return response;
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            throw error;
          }
        }
      },
  
      put: async (url: string, data: Record<string, any>) => {
        const source = axios.CancelToken.source();
        try {
          const response = await instance.put(url, data, {
            cancelToken: source.token,
          });
          return response;
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log("Request canceled:", error.message);
          } else {
            throw error;
          }
        }
      },

    };

    return ApiUtils;
}

export default UseApiUtils;
