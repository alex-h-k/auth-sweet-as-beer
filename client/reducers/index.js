import {combineReducers} from 'redux'

import currentPage from './current-page'
import beers from './beers'
import cart from './cart'

export default combineReducers({
  currentPage,
  beers,
  cart
})
