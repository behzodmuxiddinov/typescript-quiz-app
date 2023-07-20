import { iteratorSymbol } from "immer/dist/internal"
import { shuffleArray } from "./shuffleArr"

type QuestionObj = {
    category : string,
    correct_answer : string,
    difficulty : string,
    incorrect_answers : string[],
    question : string,
    type : string
}

export type QuestionState = QuestionObj & { answers : string[], completed : boolean, usersanswer : string}



export const fetchQuestions = async () => {
    const req = 'https://opentdb.com/api.php?amount=10&type=multiple'
    const res = await(await fetch(req)).json()
    return res.results.map((item : QuestionObj) => ({
            ...item, 
            answers : shuffleArray([
                ...item.incorrect_answers, 
                item.correct_answer
            ]),
            completed : false,
            usersanswer : ''
        }
    ))
}