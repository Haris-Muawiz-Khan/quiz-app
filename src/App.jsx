import Question from './components/Questions/Questions'
import StartPage from './components/StartPage/Start'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import Checking from './components/Checking/Checking'

const App = () => {
    const [start, setStart] = useState(false)
    const [questions, setQuestions] = useState([])
    const [finish, setFinish] = useState(false)
    const [runFetch, setRunFetch] = useState(false)
    const [loading, setLoading] = useState(true)
    let score = 0;

    useEffect(() => {
        setLoading(true)
        fetch("https://opentdb.com/api.php?amount=10")
            .then(res => res.json())
            .then(data => setQuestions(()=>questionsProp(data.results)))
    }, [runFetch])

    function startStop() {
        setStart(prevState => !prevState)
    }

    function startStopEnd() {
        setStart(prevState => !prevState)
        if (finish === true) {
            setFinish(prevState => !prevState)
        }
            setRunFetch(prevState => !prevState)
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

    const question = questions.map(item => {
        return(<Question 
            key={item.id}
            question={item.question}
            options={item.options}
            quesItemId={item.id}
            checkAns={checkAns}
            whenClicked={whenClicked}
            finish={finish}
        />)
    },[])

    const checking = questions.map(item => {
        const obj = checkAns(item)

        return(<Checking 
            key={item.id}
            correct={obj.value}
            question={item.question}
            options={item.options}
            id={obj.id}
        />)
    })

    function whenClicked(id, itemId) {
        const newQ = questions.map(item => {
            const option = item.options.map(opt => {
                if (item.id === itemId) {
                    if (opt.id === id) {
                        return {...opt, selected:!opt.selected}
                    }
                    else {
                        return {...opt, selected:false}
                    }
                }
                else {
                    return opt
                }
            })
            return ({...item, options: option})
        })
        setQuestions(newQ)
    }

    function questionsProp(data) {
        setLoading(false)
        let multipleChoiceArray = []
        const newArary = data.map(item => {
            multipleChoiceArray = item.incorrect_answers
            if (!multipleChoiceArray.includes(item.correct_answer)) {
                multipleChoiceArray.push(item.correct_answer)
            }
            multipleChoiceArray = shuffle(multipleChoiceArray)
            const choiceArray = multipleChoiceArray.map(item => {
                return({value: item, id:nanoid(), selected:false})
            })
            return({...item, id:nanoid(), options:choiceArray, correct:false})
        })
        return newArary
    }

    
    function checkAns(item) {
        let ans = ''
        let id = ''
        for (let i = 0; i< item.options.length; i++) {
            if (item.options[i].selected) {
                ans = item.options[i].value
                id = item.options[i].id
            }
        }
        if (ans === item.correct_answer) {
            score++
            return {value:true, id:id}
        }else {
            return {value:false, id:id}
        }
    }

    function endQuiz () {
        setFinish(prevState=> !prevState)
    }

  return (
      <div className='app__container'>
        {
            !start ? 
                <StartPage startStop={startStop} loading={loading}/>
            :
            (start && !finish) ?
                <>
                    {question}
                    <button className='btn' onClick={endQuiz}>Check Answer</button>
                </>
             : 
             <>
                {checking}
                <div style={{'display':'flex', 'alignItems':'center', 'justifyContent':'flex-start', 'gap':'32.3%', 'textAlign':'center'}}>
                    <div style={{'fontWeight':'bold', 'fontFamily':'"Karla", sans-sarif', 'marginTop':'1.75rem'}}>Your Score is {score}/{questions.length}</div>
                    <button className='btn' onClick={startStopEnd}>Play Again</button>
                </div>
             </>
        }
    </div>
  )
}

export default App