import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Pages from './components/Pages.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Pages />
  </Provider>,
)
