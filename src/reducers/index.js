import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import EventDetailReducer from './EventDetailReducer';
import AuthReducer from './AuthReducer'

export default combineReducers({
    home: HomeReducer,
    event: EventDetailReducer,
    auth: AuthReducer
});