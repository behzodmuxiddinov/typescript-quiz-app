import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchQuestions } from './Api';
import { QuestionState } from './Api';
import QuestionCard from './components/QuestionCard';
import AnswersCard from './components/AnswersCard';
import { AnswerObj } from './components/AnswersCard';

const App = () => {
  const totalQuestions = 10
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([])
  const [loading, setLoading] = useState(false)
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [disable, setDisable] = useState(false)
  const [over, setOver] = useState(true)
  const [review, setReview] = useState(false)
  const [answercard, setAnswercard] = useState(false)

  const startQuiz = async (e :React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.setAttribute('disabled', 'false')
    setLoading(true)
    setAnswercard(false)
    const newQuestions = await fetchQuestions()
    setQuestions(newQuestions)
    setLoading(false)
    setOver(false)
    setAnswercard(false)
    setNumber(0)
    setScore(0)
    setDisable(false)
    setUserAnswers([])
  }
  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value
    const correct = questions[number].correct_answer == answer
    questions[number].usersanswer = e.currentTarget.value
    if(correct){
      setScore(prev => prev + 1)
      e.currentTarget.setAttribute('class', 'bg-green-800 rounded-md w-1/4 py-2 px-18 text-white')
      userAnswers.push({
        question : questions[number].question,
        correctAnswer : questions[number].correct_answer,
        incorrectAnswers : questions[number].incorrect_answers,
        chosenAnswer : e.currentTarget.value,
        allAnswers : questions[number].answers
      })
    }
    questions[number].completed = true
    if(e.currentTarget.value !== questions[number].correct_answer){
      e.currentTarget.setAttribute('class', 'bg-red-800 rounded-md w-1/4 py-2 px-18 text-white')
      const btns = document.getElementsByTagName('button')
      for(let i = 0; i < btns.length; i++){
        let correctBtn:boolean = btns[i].value == questions[number].correct_answer
        if(correctBtn){
          btns[i].setAttribute('class', 'bg-green-800 rounded-md w-1/4 py-2 px-18 text-white')
        }
      }
      userAnswers.push({
        question : questions[number].question,
        correctAnswer : questions[number].correct_answer,
        incorrectAnswers : questions[number].incorrect_answers,
        chosenAnswer : e.currentTarget.value,
        allAnswers : questions[number].answers
      })
    }
    if(questions.filter(item => item.completed == false).length == 0){
      setReview(true)
    }
  }

  const nextOne = () => {
    setNumber((prev:number) => prev + 1)
  }
  const prevOne = () => {
    setNumber((prev:number) => prev - 1)
  }

  const showAnswers = () => {
    setOver(true)
    setAnswercard(true)
    setReview(false)
    setNumber(0)
  }

  const sortArr = () => {
    let arr = questions.map(item => item.question)
    setUserAnswers(userAnswers.sort((a:any,b:any) => arr.indexOf(a.question) - arr.indexOf(b.question)))
    console.log(userAnswers)
  }
  useEffect(sortArr,[number])
  
  return (
    <div className='w-full m-auto mt-11 flex flex-col justify-center items-center rounded-md font-mono py-4'>
      {over && <button onClick={startQuiz} className={`w-1/6 bg-blue-800 rounded-md text-white flex justify-center align-middle text-xl ${loading ? 'opacity-50' : ''}`}>Start Quiz</button>}
      {!over && <strong className='text-white text-2xl'>Question {number+1}/{totalQuestions}</strong>}
      {loading && <h2 className='text-white'>Loading...</h2>}
      {!over && <QuestionCard
      question = {questions[number].question}
      answers = {questions[number].answers}
      checkAnswer = {checkAnswer}
      questions = {questions}
      number = {number}
      />}
      {answercard && <AnswersCard setNumber={setNumber} questions={questions} allAnswers={userAnswers[number].allAnswers} number={number} totalQuestions={totalQuestions} userAnswers={userAnswers} />}
      {!over && <h2 className='text-white text-2xl'>Score:{score}</h2>}
      {review ? <button className='text-white text-2xl rounded-md bg-blue-800 text-center p-2 mt-2' onClick={showAnswers}>Review the test</button> : ''}
      {!over && <div className="flex w-max">
        <button onClick={prevOne} className={`cursor-pointer text-xl text-black px-5 py-2 rounded-md bg-white my-3 ${number == 0 ? 'opacity-50' : ''}`} disabled={number == 0 ? true : false}>Prev</button>
        <button onClick={nextOne} className={`ml-5 cursor-pointer text-xl text-black px-5 py-2 rounded-md bg-white my-3 ${number == 9 ? 'opacity-50' : ''}`} disabled={number == 9 ? true : false}>Next</button>
      </div>}
    </div>
  )
}

export default App