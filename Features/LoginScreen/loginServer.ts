import { View, Text } from 'react-native'
import React from 'react';
import UseApiUtils from '@/hooks/useApiHook';
interface LoginI {
    Email: string;
    Password: string;
    rmemberMe?: boolean
}

const loginServer = () => {
    const apiService = UseApiUtils();
    const login = async(data:LoginI) => {
        try {
          const res = await apiService.post(`mobile/loginuser?Email=${data.Email.trim()}&Password=${data.Password.trim()}`, {
            Email: data?.Email,
            Password: data.Password
          })
          if(res?.data) {
            return res.data
          }
        } catch (error: any) {
          alert(error?.message)
        }
    }
  return {
    login
  }
}

export default loginServer