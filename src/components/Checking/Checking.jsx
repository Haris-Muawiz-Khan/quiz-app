import React from 'react'
import './Checking.css'

const Checking = (props) => {
    const correctStyles = {
        'color': '#293264',
        'backgroundColor': '#94D7A2'
    }

    const inCorrectStyles = {
        'color': '#293264',
        'backgroundColor': '#F8BCBC'
    }

    const multipleChoiceOptions = 
        props.options.map(item => <span style={(props.correct && item.id===props.id && item.selected) ? correctStyles : (!props.correct && item.id===props.id && item.selected) ? inCorrectStyles : {}} 
        key={item.id} 
        className='mcq__option' >
            {item.value}
            </span>
    )
    
      return (
        <div className='question__container'>
            <h2 className="question">
                {props.question}
            </h2>
            <div className="options">
                {multipleChoiceOptions}
            </div>
            <hr />
        </div>
      )
}

export default Checking