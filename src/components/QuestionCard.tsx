import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import { QuestionState } from '../Api'
import { AnswerObj } from './AnswersCard'

type Props = {
  question : string,
  answers : string[],
  checkAnswer : any,
  questions : QuestionState[],
  number : number,
}

const QuestionCard:React.FC<Props> = ({question,answers,checkAnswer,questions,number}) => {
  return (
    <>
      <p className='text-white text-xl w-1/3 text-start'>{question}</p>
      <ul className='w-full flex flex-col items-center my-5'>
      {
        answers.map((item) => {
          return <li key={item} className='w-full flex justify-center last:mb-0 mb-4'><button className={`rounded-md w-1/4 bg-blue-800 py-2 px-1 text-white break-words ${questions[number].completed && item == questions[number].correct_answer ? 'bg-green-800' : ''} ${questions[number].completed && questions[number].usersanswer == item && questions[number].incorrect_answers.includes(item) ? 'bg-red-800' : ''} `} value={item} onClick={checkAnswer} disabled={questions[number].completed ? true : false}>{item}</button></li>
        })
      }
      </ul>
    </>
  )
}

export default QuestionCard