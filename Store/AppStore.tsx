import zustand from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from 'zustand/middleware'
import UserModel from '../model/user.model';

interface AppState {
    user: UserModel | null;
}

const useAppStore = zustand.create<AppState>()(
    persist(
        (set) => ({
            user: null
        }),
        {
            name: 'app-store',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);
export default useAppStore;