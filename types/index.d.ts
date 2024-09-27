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
    value: string; 
}

declare interface LocaleState {
    value: string; 
}

declare interface Category {
    _id: string,
    title: string,
    logo: object,
    slug: {
        current: string
    } 
}