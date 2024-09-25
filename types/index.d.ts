declare type IUser = {
    _id: string;
    _type: string;
    userName: string;
    image: string;
}

declare interface StateContextType {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

declare interface StateContextProviderProps {
    children: ReactNode;
}

declare interface ThemeState {
    value: 'dark' | 'light'; 
}