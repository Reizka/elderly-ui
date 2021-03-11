import { currentUser } from '../../stores/current_user'
import { Auth } from '../../config/firebase'
import { Employees } from '../database/employees'

Auth.onAuthStateChanged(() => {
  if (Auth.currentUser) {
    const userInfo = {
      email: Auth.currentUser.email,
      id: Auth.currentUser.uid,
      phoneNumber: Auth.currentUser.phoneNumber,
      photoUrl: Auth.currentUser.photoUrl
    }

    currentUser.set(userInfo)
  } else {
    currentUser.set(null)
  }
})
