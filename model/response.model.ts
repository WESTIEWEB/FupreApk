import { AssetData } from "../Interface/assetInterface";
import { UserModel } from "./user.model";

export interface ResponseModel {
    id: string | null;
    IsSuccess: boolean;
    Message: string;
    Data: AssetData | UserModel | any;
}