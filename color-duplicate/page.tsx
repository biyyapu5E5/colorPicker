'use client'

import { useEffect } from 'react';
import '../globals.css'
import Confetti from 'react-confetti';
import { useDispatch, useSelector } from 'react-redux';
import { updateScore, updateButtons, pickColor, updateTimer, evaluateMsg, updateReset } from '../redux/slice';


export default function ColorPage() {

    //   const [dict, setDict] = useState<{ text: string, color: string, options: string[] }>(default_dict);
    //   const [score, setScore] = useState<{ correct: number, wrong: number, attempted: number }>(default_score);
    const colorClasses = useSelector((state: any) => state.colorClasses);
    const { dict, score, timer, start, restart, msg } = useSelector((state:any) => state.colorpicker);
    const dispatch = useDispatch();

    // const [start, setStart] = useState<boolean>(true);
    // const [restart, setRestart] = useState<boolean>(false);
    // const [timer, setTimer] = useState<number>(10);
    // const [msg, setMsg] = useState<{ message: string, wonState: boolean }>({ message: "Don't give up! That's okay, everyone stumbles!", wonState: false });


    // function PickColor() {
    //     const random = (arr: string[]): [number, number] => {
    //         let randText = Math.floor(Math.random() * arr.length);
    //         let randColor = Math.floor(Math.random() * arr.length);

    //         while (randText === randColor) {
    //             randColor = Math.floor(Math.random() * arr.length);
    //         }

    //         return [randText, randColor];
    //     }
    //     const shuffle = (array: string[]): string[] => {
    //         for (let i = array.length - 1; i > 0; i--) {
    //             const j = Math.floor(Math.random() * (i + 1));
    //             [array[i], array[j]] = [array[j], array[i]];
    //         }
    //         return array;
    //     };
    //     const [text, color] = random(colorClasses);
    //     let array: string[] = colorClasses.filter((col:string, index:number) => text !== index && color !== index)
    //     const [col1, col2] = random(array);
    //     let options = shuffle([colorClasses[text], colorClasses[color], array[col1], array[col2]]);

    //     dispatch(updateDict({options,text,color}));
    //     // setDict({
    //     //     text: colorClasses[text],
    //     //     color: colorClasses[color],
    //     //     options
    //     // })
    // }

    useEffect(() => {
        dispatch(pickColor());
    }, []);

    let options = dict['options'];

    function handleCheck(option: string): void{
        dispatch(updateScore(option));
        dispatch(pickColor());
    }

    function handleStart(): void {
        handleTimer();
        dispatch(updateButtons({start: false}));
        dispatch(pickColor());
    }

    function handleReset(): void {
        dispatch(updateReset());
        dispatch(pickColor());
    }

    function handleTimer() {
        // let intervalId: NodeJS.Timeout;
        window.setInterval(()=> {
           dispatch(updateTimer());
        }, 1000)
    }

    useEffect(() => {
       dispatch(evaluateMsg());
    }, [restart]);

    return (
        <div className='w-full h-full'>
            {msg.wonState && <Confetti />}
            {restart && msg.message}
            <h1>Timer: {timer}</h1>
            <h1 style={{ color: dict.text }} >{dict.color.toUpperCase()}</h1>
            <div className='flex' style={{ pointerEvents: start ? 'none' : 'auto' }}>
                <span style={{ backgroundColor: options[0] }} className='w-20 h-20 block' onClick={() => { handleCheck(options[0]) }}></span>
                <span style={{ backgroundColor: options[1] }} className='w-20 h-20 block' onClick={() => { handleCheck(options[1]) }}></span>
                <span style={{ backgroundColor: options[2] }} className='w-20 h-20 block' onClick={() => { handleCheck(options[2]) }}></span>
                <span style={{ backgroundColor: options[3] }} className='w-20 h-20 block' onClick={() => { handleCheck(options[3]) }}></span>
            </div>
            <div>
                <p>correct: {score.correct}</p>
                <p>wrong: {score.wrong}</p>
                <p>attempted: {score.attempted}</p>
            </div>
            {restart && <button onClick={handleReset}>Reset</button>}
            {start && <button onClick={handleStart}>Start</button>}
        </div>
    )
}
