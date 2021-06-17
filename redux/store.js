import { createStore, applyMiddleware } from 'redux'
import { useMemo } from 'react'
import { compositeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import rootReducer from './reducer'

let createStore

function initStore(preloadedState = {}) {
  return createStore(
    rootReducer,
    preloadedState,
    compositeWithDevTools(applyMiddleware(promiseMiddleware, logger))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') {
    return _store
  }

  if (!store) {
    store = _store
  }

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}