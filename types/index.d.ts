declare interface IUser {
    _id: string;
    _type: string;
    name: string;
    image: string;
    email: string;
}

declare interface IUserExt extends IUser {
    quizzes: QuizDetail[];
    questions: QuestionProps[];
    userName: string;
    role: string;
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

declare interface Title {
    ru: string;
    en?: string;
}

declare interface Slug {
    current: string;
}

declare interface TextBlock {
    children: { text: string }[];
}

declare interface LevelDataProps {
    title: Title;
    slug: Slug;
    difficulty: number;
    _id: string;
}

declare interface Answer {
    answerText: Title;
    isCorrect: boolean;
}

declare interface QuestionText {
    ru: TextBlock[];
    en?: TextBlock[];
}

declare interface QuestionDataProps {
    title: Title;
    slug: Slug;
    difficulty: number;
    level: any;
    questionText?: QuestionText;
    answers?: Answer[];
}

declare interface QuestionPropsMutation extends QuestionDataProps {
    author?: string;
    hasOptions: boolean;
    category: string;
}

declare interface QuestionProps {
    _id: string;
    title: Title;
    level: number | string;
    questionText?: QuestionText;
    answers?: Answer[];
    locale: string;
    onAnswerSelect: (questionId: string, answer: string) => void;
    isAuthor: boolean;
    isQuizStarted: boolean;
}

declare interface CategoryPropsData {
    levels: LevelDataProps[];
    allQuestions: QuestionDataProps[];
    questionsByLevel: QuestionDataProps[];
    quizData: Quiz[];
}

declare interface Category {
    _id: string;
    title: string;
    logo: object;
    slug: Slug;
}

declare interface QuizCardProps {
    title: Title;
    icon: string;
    slug: string;
    author: string;
    questions: QuestionProps[];
}

declare interface QuizData {
    quizData: QuizCardProps[];
}

declare interface LevelSelect {
    _id: string;
    title: Title;
}

declare interface CategorySelect {
    _id: string;
    title: string;
}

declare namespace JSX {
    interface IntrinsicElements {
        'df-messenger': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            intent?: string;
            'chat-title'?: string;
            'agent-id'?: string;
            'language-code'?: string;
        };
    }
}


interface CreateQuizData {
    title: string;
    questions: string[];
    author: string; 
}