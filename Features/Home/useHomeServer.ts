import { View, Text } from 'react-native'
import React from 'react'
import UseApiUtils from '@/hooks/useApiHook'
import { ResponseModel } from '@/model/response.model';

const useHomeServer = () => {
  const apiService = UseApiUtils();


    /**
     * @getTagInfo
     * @param tagName 
     * @returns result
     */
  const fetchDetails = async (tagName: string) => {
    // FUPRE/ST/FF/009
    try {
        const res = await apiService.get(`mobile/scan?tagno=${tagName}`) as any;
        let data = res.data as unknown as ResponseModel;
        if(res.data.IsSuccess) {
            return res
        } else {
            return {
                message: res.Message
            }
        }
    } catch (error: any) {
        console.log(error)
        if(error.response.data) {
            console.log(error.response)
            return {
                message: error.response.data?.message || error.response.data?.responseMessage
            }
        }
    }
  }
  return {
    fetchDetails
    }
}

export default useHomeServer