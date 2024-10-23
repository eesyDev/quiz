declare type IUser = {
    _id: string;
    _type: string;
    name: string;
    image: string;
    email: string
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

declare interface LevelDataProps {
    title: {
        ru: string,
        en: string
    },
    slug: {
        current: string
    },
    difficulty: number,
    _id: string
}

declare interface QuestionDataProps {
    title: {
        ru: string;
        en: string;
    };
    slug: {
        current: string;
    };
    difficulty: number;
    level: any;
    questionText?: {
        ru: {
            children: { text: string }[];
        }[];
        en: {
            children: { text: string }[];
        }[];
    } | undefined;
    answers?: {
        answerText: {
            en?: string,
            ru: string 
        }
    }[];
}

// declare interface Quiz {
//     title: {
//         en?: string,
//         ru: string 
//     },
//     category: string
// }

declare interface CategoryPropsData {
    levels: LevelDataProps[],
    allQuestions: QuestionDataProps[],
    questionsByLevel: QuestionDataProps[],
    quizData: Quiz[]
}

declare interface Category {
    title: string,
    _id: string,
    title: string,
    logo: object,
    slug: {
        current: string
    },
}
declare interface QuestionProps {
    _id: string,
    title: {
        en?: string,
        ru: string 
    },
    level: number | string,
    questionText?: {
        en?: [
            {children: [
                {text: string}
            ]}
        ],
        ru: [
            {children: [
                {text: string}
            ]}
        ],
    },
    answers?: Answer[],
    locale: string,
    onAnswerSelect: (questionId: string, answer: string) => void;
}

interface Answer {
    answerText: {
      en?: string;
      ru: string;
    };
  }

declare interface QuizCardProps {
    title: {
        en?: string,
        ru: string 
    },
    icon: string,
    // category: string,
    slug: string,
    questions: QuestionProps[]
}

declare interface QuizData {
    quizData: QuizCardProps[]
}

