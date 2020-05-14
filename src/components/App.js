import React,{useEffect, useReducer} from 'react';

import CalenderForm from './CalenderForm'
// import Events from './Events'
// import OperationLogs from './OperationLogs'
import AppContext from '../contexts/AppContext'
import reducer from '../reducers'

const APP_KEY= 'appWithRedux'

const App = () => {

  const appState = localStorage.getItem(APP_KEY)

  // 三項演算子（if文のショートカット、ローカルストレージがNULLの場合に初期値セット、ある場合はそれをJSONparseしてセット
  const initialState = appState ? JSON.parse(appState) : {
    events:[],
    targetdate:new Date()
  }

  console.log(initialState.targetdate)

  const [state,dispatch]=useReducer(reducer,initialState)

  // useEffectはstateに変化があった時に実行される。
  useEffect(() => {
    localStorage.setItem(APP_KEY,JSON.stringify(state))
  },[state])

  return (
    <AppContext.Provider value ={{state,dispatch}}>
      <div className="container-fluid">
        <CalenderForm />
      </div>
    </AppContext.Provider>
  )
}

export default App;
