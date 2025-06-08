'use client'

import React, { useEffect, useState } from 'react';
import '../globals.css'
import Confetti from 'react-confetti';
import AnimatedDonut from '../animated-donut/AnimatedDonut';

const default_dict = { text: '', color: '', options: [] };
const default_score = { correct: 0, wrong: 0, attempted: 0 };
const colorClasses: string[] = ['black', 'brown', 'blue', 'green', 'grey', 'gold', 'orange', 'pink', 'purple', 'red', 'violet', 'white', 'yellow']


export default function ColorPage() {

  const [dict, setDict] = useState<{ text: string, color: string, options: string[] }>(default_dict);
  const [score, setScore] = useState<{ correct: number, wrong: number, attempted: number }>(default_score);
  const [start, setStart] = useState<boolean>(true);
  const [restart, setRestart] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(10);
  const [msg, setMsg] = useState<{ message: string, wonState: boolean }>({ message: "Don't give up! That's okay, everyone stumbles!", wonState: false });

  function PickColor() {
    const random = (arr: string[]): [number, number] => {
      const randText = Math.floor(Math.random() * arr.length);
      let randColor = Math.floor(Math.random() * arr.length);

      while (randText === randColor) {
        randColor = Math.floor(Math.random() * arr.length);
      }

      return [randText, randColor];
    }
    const shuffle = (array: string[]): string[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const [text, color] = random(colorClasses);
    const array: string[] = colorClasses.filter((col, index) => text !== index && color !== index)
    const [col1, col2] = random(array);
    const optionsList = shuffle([colorClasses[text], colorClasses[color], array[col1], array[col2]]);

    setDict({
      text: colorClasses[text],
      color: colorClasses[color],
      options: optionsList
    })
  }

  useEffect(() => {
    PickColor();
  }, []);

  const options = dict['options']

  function handleCheck(event : React.MouseEvent<HTMLDivElement>): void {
    let target = event.target as HTMLElement;  {/* Type Assertion */}
    let option = target.style.backgroundColor;
    setScore((prev) => {
      return {
        attempted: prev.attempted + 1,
        correct: option === dict.text ? prev.correct + 1 : prev.correct,
        wrong: option === dict.text ? prev.wrong : prev.wrong + 1
      }
    })
    PickColor();
  }

  function handleStart(): void {
    handleTimer();
    setStart(false);
    PickColor();
  }

  function handleReset(): void {
    setDict(default_dict);
    setScore(default_score);
    setStart(true);
    setRestart(false);
    PickColor();
  }

  function handleTimer() {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(intervalId);
          setStart(false);
          setRestart(!restart);
          return 10;
        }
        return prev - 1;
      })
    }, 1000)
  }

  useEffect(() => {
    if (restart && score.attempted !== 0) {
      if (score.attempted === score.correct) {
        setMsg({ message: 'Well played!!!😍😎🎉🎊', wonState: true });
      } else if (score.attempted - score.correct == 2 || score.attempted - score.correct == 1) {
        setMsg({ message: 'So close!😊', wonState: false });
      } else {
        setMsg({ message: 'Oops, try again!☹️', wonState: false });
      }
    }
    else if (score.attempted === 0) {
      setMsg({ message: 'Zero effort detected...You Skipped the fun..??🤨', wonState: false })
    }
  }, [restart, score.attempted, score.correct]);

  return (
    <section className='bg-[oklch(48.9%_0.046_257.417)] flex justify-center items-center  min-h-screen font-karla select-none'>
      <div className='text-white rounded-xl bg-[oklch(28.7%_0.09_281.288)] flex flex-col items-center p-12'>
        <p className='text-5xl -mt-5 mb-5 font-bold'> Color Picker </p>
        {msg.wonState && <Confetti />}
        <div className='flex flex-col gap-2 relative'>
          <div className='text-sm flex justify-between'>
            <p className='cursor-pointer flex group peer' tabIndex={0}>
              <span className='underline underline-offset-5 '>Help</span>
              <span className='block mx-1 w-4 h-4 text-[10px] self-end text-center border rounded-full'>?</span>
            </p>
            <div className='invisible peer-hover:visible peer-focus:visible  w-[62%] text-slate-500 font-medium font-serif absolute top-6 bg-gray-100 p-4 rounded-lg'>
              <span className='text-sm leading-0'>Pick the color of the text, not the name of the text color </span>
              <br />
              <br />
              Example:
              <br />
              <span className='text-green-500'>Red</span>
              <br />
              Answer: <span className='block h-3 w-3 bg-green-500'></span>
            </div>
            <p className='flex gap-2 w-[21%]'><span>Timer :</span><span className={`font-bold ${timer < 3 ? 'text-red-700' : 'text-inherit'}`}>{timer}</span></p>
          </div>
          <h1 style={{ color: dict.text }} className='self-center'>{dict.color.toUpperCase()}</h1>
          {/* Event Delegation*/}
          <div className={`flex w-full ${start || restart ? 'cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`} onClick = {handleCheck}>  
            <span style={{ backgroundColor: options[0] }} className='w-20 h-20 block transform hover:scale-110' ></span>
            <span style={{ backgroundColor: options[1] }} className='w-20 h-20 block transform hover:scale-110' ></span>
            <span style={{ backgroundColor: options[2] }} className='w-20 h-20 block transform hover:scale-110' ></span>
            <span style={{ backgroundColor: options[3] }} className='w-20 h-20 block transform hover:scale-110' ></span>
          </div>
        </div>
        {restart && <button onClick={handleReset} className='border-2 border-purple-600 px-8 py-1 my-5 rounded-xl hover:font-bold cursor-pointer hover:bg-purple-600 self-center'>Reset</button>}
        {start && <button onClick={handleStart} className='text-white hover:text-black border-2 border-white px-8 py-1 my-5 rounded-xl hover:bg-gray-200 hover:font-bold cursor-pointer self-center'>Start</button>}
        {restart && <div className="flex gap-10">
          <AnimatedDonut value={score.correct} max={score.attempted} label="Correct" color="#22C55E" />
          <AnimatedDonut value={score.wrong} max={score.attempted} label="Wrong" color="#EF4444" />
          <AnimatedDonut value={score.attempted} max={score.attempted} label="Attempted" color="#3B82F6" />
        </div>}
        <p className='mt-4'>{restart && msg.message}</p>
      </div>
    </section>

  )
}
