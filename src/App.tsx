import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import './App.css'
import Bubble from './bubble'
import BubbleInput from './bubble-input'
import Chat from './chat'
import useMessages from './use-messages'

function App() {
  const [messages, addMessage] = useMessages([])
  const [newMessage, setNewMessage] = useState('')
  const [fillColour, setFillColour] = useState('#e6e5eb')
  const [strokeColour, setStrokeColour] = useState('#000000')
  const [bubbleTimeout, setBubbleTimeout] = useState(500)

  const handleSubmit = useCallback(
    (bubbleHeight: number) => {
      if (newMessage.length > 0) {
        addMessage({
          id: +new Date(),
          text: newMessage,
          height: bubbleHeight,
          timeout: bubbleTimeout
        })
        setNewMessage('')
      }
    },
    [newMessage, messages]
  )

  const handleFillColourChange = (color: { hex: string }) => {
    setFillColour(color.hex)
    console.log(color)
  }

  const handleStrokeColourChange = (color: { hex: string }) => {
    setStrokeColour(color.hex)
    console.log(color)
  }

  const lastMessage = messages[messages.length - 1]
  const dy = lastMessage ? lastMessage.height : 0

  const handleBubbleTimeoutIncrease = () => {
    setBubbleTimeout(bubbleTimeout + 500)
  }

  const handleBubbleTimeoutDecrease = () => {
    setBubbleTimeout(bubbleTimeout - 500)
  }

  return (
    <div className="App">
      <Chat>
        <AnimatePresence>
          {messages.map(m => (
            <Bubble
              key={m.id}
              id={m.id}
              dy={dy}
              fillColour={fillColour}
              strokeColour={strokeColour}
            >
              {m.text}
            </Bubble>
          ))}
        </AnimatePresence>
        <BubbleInput
          value={newMessage}
          onChange={setNewMessage}
          onSubmit={handleSubmit}
          fillColour={fillColour}
          strokeColour={strokeColour}
        />
      </Chat>
    </div>
  )
}

export default App
