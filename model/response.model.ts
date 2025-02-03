import { AssetData } from "../Interface/assetInterface";

export interface ResponseModel {
    id: string | null;
    IsSuccess: boolean;
    Message: string;
    Data: AssetData;
}