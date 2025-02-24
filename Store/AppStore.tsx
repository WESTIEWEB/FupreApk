import zustand from 'zustand';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserModel } from '@/model/user.model';

interface AppState {
    user: UserModel | null;
    setTokenExpired: (value: boolean) => void;
    setUser: (value: UserModel) => void;
    tokenExpired: boolean;
    logout: () => void;
}

const useAppStore = zustand.create<AppState>()(
    persist(
        (set) => ({
            user: null,
            logout: () => set({ user: null }),
            setTokenExpired: (value: boolean) => set({ tokenExpired: value }),
            setUser: (value: UserModel | null) => set({ user: value }),
            tokenExpired: true,
        }),
        {
            name: 'app-store',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);
export default useAppStore;