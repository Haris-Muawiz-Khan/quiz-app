import React from 'react'
import './Questions.css'

const Questions = (props) => {
  const styles = {
    'color': 'white',
    'backgroundColor': '#4D5B9E'
  }

    const multipleChoiceOptions = 
      props.options.map(item => <span style={item.selected ? styles : {}} 
        key={item.id} 
        className='mcq__option' 
        onClick={()=>props.whenClicked(item.id, props.quesItemId)}>
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

export default Questions