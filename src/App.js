import { useState, useCallback } from 'react'
import List from './List'

export default function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  //just to simulate an api call
  const getItems = useCallback(() => {
    return [number, number + 1, number + 2]
  }, [number])
  /*
  useCallback is similar to useMemo, but the one big difference is that useMemo takes a function and it will return to you the return value of the function
  but useCallback takes a function, but that is what useCallback returns
  so for above getItems, if using useMemo, you'd only get the array, but using useCallback will actually return the whole function itself
  which allows us to use it as a function later on in our application in List.js's getItems call
  ex: if List.js does getItems(5) then this.getItems' useCallback will have argument in arrow func incrementor, and can use that param within that function to do whatever

  you only want to use useCallback hook if you need to worry about referential equality,
  another reason for useCallback being useful is
  if a func you create is really slow, then you need to use useCallback so that you only create that function when you need to and not everytime you render, but is a very rare situation
  moreso only when you have referential equality problems and almost always when you're going to use other hooks like useEffects or useMemo where you need to have that value inside the dependency's array

  in List.js [getItems] dependency changes everytimes in useEffect because we create a brand new function. but with useCallback we're not creating a new function unless we need to, so the referential equality of getItems from the first time
  it rendered and getItems the next time it renders is going to be the same as long as the number input in List.js' useEffect's setItems(getItems(number) => {......}) doesn't actually change
  */


  const theme = {
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF': '#333'
  }

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={e => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark(prevDark => !prevDark)}>
        Toggle theme
      </button>
      <List getItems={getItems} />
    </div>
  )
}