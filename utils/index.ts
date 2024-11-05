import { client } from './client';
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const sideMenu = {
    en: [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Categories",
            link: "/category/all"
        },
        {
            name: "Quizes",
            link: "/quiz"
        },
        {
            name: "Account",
            link: "/account"
        },
        {
            name: "Blog",
            link: "/blog"
        }
    ],
    ru: [
        {
            name: "Главная",
            link: "/"
        },
        {
            name: "Категории",
            link: "/category/all"
        },
        {
            name: "Квизы",
            link: "/quiz"
        },
        {
            name: "Личный кабинет",
            link: "/account"
        },
        {
            name: "Блог",
            link: "/blog"
        }
    ]
}

export const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 50);
};

export const fetchLevels = async () => {
    return client.fetch(`*[_type == "level"]{ _id, title }`);
  };
  
  export const fetchCategories = async () => {
    return client.fetch(`*[_type == "category"]{ _id, title }`);
  };