import React, { useState } from 'react'

interface Props {
  initial: number
  onChange: (num: number) => void
}

const Stepper: React.FC<Props> = ({ initial = 0, onChange = (num: number) => {} }) => {
  const [count, setCount] = useState(initial)

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    onChange(newCount)
  }

  const handleDecrement = () => {
    const newCount = count - 1
    setCount(newCount)
    onChange(newCount)
  }

  return (
    <div>
      <button data-cy="decrement" onClick={handleDecrement}>
        -
      </button>
      <span data-cy="counter">{count}</span>
      <button data-cy="increment" onClick={handleIncrement}>
        +
      </button>
    </div>
  )
}

export default Stepper
