import React from 'react'
import { QuestionState } from '../Api'

export interface AnswerObj  {
    question : string,
    correctAnswer : string,
    incorrectAnswers : string[],
    chosenAnswer : string,
    allAnswers : string[]
}

type Props = {
    allAnswers : string[],
    number : number,
    totalQuestions : number,
    questions : QuestionState[],
    setNumber : Function,
    userAnswers : AnswerObj[]
}

const AnswersCard:React.FC<Props> = ({ questions, allAnswers, number, totalQuestions, setNumber, userAnswers }) => {
    const nextAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
        setNumber((prev: number) => prev + 1)
    }
    const prevAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
        setNumber((prev: number) => prev - 1)
    }
  return (
    <div className='w-full m-auto mt-11 flex flex-col justify-center items-center rounded-md font-mono py-4'>
        <strong className='text-white text-2xl'>Question {number+1}/{totalQuestions}</strong>
        <p className='text-white text-xl w-1/3 text-center'>{questions[number].question}</p>
        <ul className='w-full flex flex-col items-center my-5'>
            {
                allAnswers.map((item) => {
                return <li key={item} className='w-full flex justify-center last:mb-0 mb-4'><button className={`rounded-md w-1/4 bg-blue-800 py-2 px-1 text-white break-words ${userAnswers[number].correctAnswer == item ? 'bg-green-800' : ''} ${userAnswers[number].correctAnswer !== userAnswers[number].chosenAnswer && userAnswers[number].chosenAnswer == item ? 'bg-red-800' : ''}`} value={item} disabled={true}>{item}</button></li>
                })
            }
        </ul>
        <div className="flex w-max">
           <button onClick={prevAnswer} className={`cursor-pointer text-xl text-black px-5 py-2 rounded-md bg-white my-3 ${number == 0 ? 'opacity-50' : ''}`} disabled={number == 0 ? true : false}>Prev</button>
           <button onClick={nextAnswer} className={`ml-5 cursor-pointer text-xl text-black px-5 py-2 rounded-md bg-white my-3 ${number == 9 ? 'opacity-50' : ''}`} disabled={number == 9 ? true : false}>Next</button>
        </div>
    </div>
  )
}

export default AnswersCard