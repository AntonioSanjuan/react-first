import { userInitialState } from "./models/appUser.initialState"
import { UserState } from "./models/appUser.state"
import { UserActions } from "./user.actions"

const userReducer = (state: UserState = userInitialState, action: any ) => {
  switch(action.type) {
    case UserActions.setUser:
      return {
        ...state,
        isLogged: true,
        userData: action.payload,
        userStoredArticles: undefined
      }
    case UserActions.unsetUser:
      return {
        ...state,
        isLogged: false,
        userData: undefined,
        userStoredArticles: undefined
      }
    case UserActions.setStoredArticles:
      return {
        ...state,
        userStoredArticles: action.payload
      }
    default: 
      return state;
  }
}




export {userReducer}


