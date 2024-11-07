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
            link: "/quiz/all"
        },
        {
            name: "Account",
            link: "/auth/profile"
        },
        {
            name: "Blog",
            link: "/blog"
        },
        {
            name: "Questions Lib",
            link: "/questions/all"
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
            link: "/quiz/all"
        },
        {
            name: "Личный кабинет",
            link: "/auth/profile"
        },
        {
            name: "Блог",
            link: "/blog"
        },
        {
            name: "Библиотека вопросов",
            link: "/questions/all"
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