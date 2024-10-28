import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
    currentQuestionIndex: number;
    answers: Record<string, string>;
}

const initialState: QuizState = {
    currentQuestionIndex: 0,
    answers: {},
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        selectAnswer: (state, action: PayloadAction<{ key: string; answer: string }>) => {
            const { key, answer } = action.payload;
            state.answers[key] = answer;
        },
        nextQuestion: (state) => {
            state.currentQuestionIndex += 1;
        },
    },
});

export const { selectAnswer, nextQuestion } = quizSlice.actions;
export default quizSlice.reducer;
