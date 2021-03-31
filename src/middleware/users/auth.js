import { currentUser } from '../../stores/current_user'
import { Auth, Functions } from '../../config/firebase'

const getUser = Functions.httpsCallable('getUser')

Auth.onAuthStateChanged(() => {
  if (Auth.currentUser) {

    console.log('currentUser')
    getUser({ email: Auth.currentUser.email }).then(e => {
      if (e.data) {
        const { admin } = e.data;
        const userInfo = {
          email: Auth.currentUser.email,
          id: Auth.currentUser.uid,
          phoneNumber: Auth.currentUser.phoneNumber,
          photoUrl: Auth.currentUser.photoUrl,
          admin
        }

        currentUser.set(userInfo)

      }

    })
  } else {
    currentUser.set(null)
  }
})
