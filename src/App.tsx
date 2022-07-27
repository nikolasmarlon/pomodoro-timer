import { useState } from 'react'
import { Button } from './components/Button'


export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variantColor='primary' />
      <Button variantColor='secondary' />
      <Button variantColor='danger'/>
      <Button variantColor='success'/>
      <Button />
    </>
  )
}

