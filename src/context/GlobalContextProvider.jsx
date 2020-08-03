import React, { useState } from "react"

export const GlobalStateContext = React.createContext()
// export const GlobalDispatchContext = React.createContext()

// const initialState = {
//   theme: "light",
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case "TOGGLE_THEME": {
//       return {
//         ...state,
//         theme: state.theme === "light" ? "dark" : "light",
//       }
//     }
//     default:
//       throw new Error("Bad Action Type")
//   }
// }

const GlobalContextProvider = ({ children }) => {
//   const [state, dispatch] = React.useReducer(reducer, initialState)
  const [cart, setCart] = useState(['item1'])

  return (
    <GlobalStateContext.Provider value={{cart, setCart}}>
      {/* <GlobalDispatchContext.Provider value={dispatch}> */}
        {children}
      {/* </GlobalDispatchContext.Provider> */}
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider