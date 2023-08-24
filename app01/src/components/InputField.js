import React from 'react'

const InputField = ({text, addText, addTodo}) => {
  return (
    <>
        <input
            type="text"
            value={text}
            onChange={e=>addText(e.target.value)} 
        />
        <button onClick={addTodo}>Add Todo</button>
    </>
  )
}

export default InputField
