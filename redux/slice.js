
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    colorClasses: ['black', 'brown', 'blue', 'green', 'grey', 'gold', 'orange', 'pink', 'purple', 'red', 'violet', 'white', 'yellow'],
    default_dict: {
        text: '',
        color: '',
        options: []
    },
    default_score: {
        correct: 0,
        wrong: 0,
        attempted: 0
    },
    start: true,
    restart: false,
    timer: 10,
    msg: { message: "Don't give up! That's okay, everyone stumbles!", wonState: false }

}

export const myslice = createSlice({
    name: 'colorpicker',
    initialState: initialState,
    reducers: {
        pickColor: (state) => {
            const random = (arr) => {
                let randText = Math.floor(Math.random() * arr.length);
                let randColor = Math.floor(Math.random() * arr.length);

                while (randText === randColor) {
                    randColor = Math.floor(Math.random() * arr.length);
                }

                return [randText, randColor];
            }
            const shuffle = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };
            const [text, color] = random(state.colorClasses);
            let array = colorClasses.filter((col, index) => text !== index && color !== index)
            const [col1, col2] = random(array);
            let options = shuffle([state.colorClasses[text], state.colorClasses[color], array[col1], array[col2]]);

            state.default_dict = {
                text: state.colorClasses[text],
                color: state.colorClasses[color],
                options
            }
        },

        updateScore: (state, action) => {
            let score = state.default_score
            let dict = state.default_dict;
            const option = action.payload;

            score.attempted += 1;
            score.correct += option === dict.text ? 1 : 0;
            score.wrong += option === dict.text ? 0 : 1;

        },

        updateButtons: (state, action) => {
            state.start = action.payload?.start || state.start;
            state.restart = action.payload?.restart || state.restart;
        },

        updateTimer: (state) => {
            if (state.timer === 0) {
                state.start = false;
                state.restart = true;
                state.timer = 10;
            }
            else {
                state.timer -=1
            }
        },

        evaluateMsg: (state) => {
            const { correct, attempted } = state.score;
            if (attempted === 0) {
                state.msg = {
                    message: "Zero effort detected...You Skipped the fun..??🤨",
                    wonState: false
                };
            } else if (attempted === correct) {
                state.msg = {
                    message: "Well played!!!😍😎🎉🎊",
                    wonState: true
                };
            } else if (attempted - correct <= 2) {
                state.msg = {
                    message: "So close!😊",
                    wonState: false
                };
            } else {
                state.msg = {
                    message: "Oops, try again!☹️",
                    wonState: false
                };
            }
        },

        updateReset: (state)=> {
            state.default_dict = initialState.default_dict;
            state.default_score = initialState.default_score;
            state.start = initialState.start;
            state.restart = initialState.restart;
        }
    }

})

export const { pickColor, updateScore, updateButtons, updateTimer, evaluateMsg, updateReset } = myslice.actions;
export default myslice.reducer;

