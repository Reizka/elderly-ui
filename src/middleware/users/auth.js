import { currentUser } from '../../stores/current_user'
import { Auth, Functions } from '../../config/firebase'

const getUser = Functions.httpsCallable('getUser')

Auth.onAuthStateChanged(() => {
  if (Auth.currentUser) {
    console.log('test');
    getUser({ email: Auth.currentUser.email }).then(e => {
      console.log('auth e', e.data);
      const userInfo = {
        admin: false,
        email: Auth.currentUser.email,
        id: Auth.currentUser.uid,
        phoneNumber: Auth.currentUser.phoneNumber,
        photoUrl: Auth.currentUser.photoUrl
      }

      currentUser.set(userInfo)

    })
  } else {
    currentUser.set(null)
  }
})
