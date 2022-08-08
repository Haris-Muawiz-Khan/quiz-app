import React from 'react'
import './Start.css'

const Start = (props) => {
  return (
    <>
        <div className="container">    
            <h1>Quizzala</h1>
            <p>Take it "Easy", You will get plenty of chances in "LIFE"...</p>
            <button className='tooltip' disabled={props.loading || !window.navigator.onLine} onClick={props.startStop}>
              Start Quiz
              <span className='tooltiptext'>
                {window.navigator.onLine ? 'Fetching Question Paper from API. Please Wait...' : "Your Offline. Button is disabled."}
              </span>
            </button>
        </div>
    </>
  )
}

export default Start