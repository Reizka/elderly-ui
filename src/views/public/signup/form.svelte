<script>
  import { navigateTo } from 'svelte-router-spa'
  import validate from 'validate.js'
  import { Auth, Functions } from '../../../config/firebase'

  import PasswordInput from '../../components/forms/password_input.svelte'
  import EmailInput from '../../components/forms/email_input.svelte'
  import FormButtons from '../../components/forms/buttons.svelte'
  import { getNotificationsContext } from 'svelte-notifications'

  import { currentUser } from '../../../stores/current_user'
  const { addNotification, clearNotifications } = getNotificationsContext()

  const signupConstraints = {
    email: {
      presence: true,
      email: true,
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters',
      },
    },
  }

  let nameError = false
  let nameMessage = ''
  let email = ''
  let emailError = false
  let emailMessage = ''
  let passwordMessage = ''
  let password = ''
  let passwordError = false
  let disableAction = false

  const resetErrorInfo = () => {
    let nameError = false
    let nameMessage = ''
    let emailError = false
    let emailMessage = ''
    let passwordMessage = ''
    let passwordError = false
  }

  const validateLoginForm = () => {
    resetErrorInfo()
    clearNotifications()
    const validationResult = validate({ email, password }, signupConstraints)
    console.log('validationResult', validationResult)
    if (!validationResult) {
      return true
    } else {
      if (validationResult.email && validationResult.email.length > 0) {
        emailMessage = validationResult.email[0]
        emailError = true
      }
      if (validationResult.password && validationResult.password.length > 0) {
        passwordMessage = validationResult.password[0]
        passwordError = true
      }
    }

    return false
  }

  const signInUser = async () => {
    disableAction = true
    const isValid = validateLoginForm()
    // console.log('isValid', isValid)
    if (isValid) {
      let user = null
      try {
        const result = await Auth.createUserWithEmailAndPassword(email, password)
        user = result.user
      } catch (e) {
        addNotification({
          text: e.message,
          position: 'bottom-center',
          type: 'danger',
        })
        disableAction = false
      }

      console.log('user', user)
      if (user) {
        const createUser = Functions.httpsCallable('createUser')
        createUser({ email })
          .then(() => {
            console.log('yeah')
            navigateTo('ui-grid')
            currentUser.set({ email: user.email })
            addNotification({
              text: 'Your account was created successfully.',
              position: 'bottom-center',
              type: 'success',
            })
            // notificationMessage.set({
            //   message: 'Your account was created successfully. Please log in',
            //   type: 'success-toast',
            // })
            // We logout the user to generate a new jwt with right token info
            // Auth.signOut().then(() => {
            //   navigateTo('/login')
            // })
          })
          .catch((error) => {
            addNotification({
              id: 'firebase',
              text: error.message,
              position: 'bottom-center',
              type: 'danger',
            })
            console.log(error)
            disableAction = false
          })
      }
    } else {
      disableAction = false

      if (emailError)
        addNotification({
          id: 'email' + new Date().getMilliseconds(),
          text: emailMessage,
          position: 'bottom-center',
          type: 'danger',
        })
      if (passwordError) {
        setTimeout(() =>
          addNotification({
            id: 'pw' + new Date().getMilliseconds(),
            text: passwordMessage,
            position: 'bottom-center',
            type: 'danger',
          })
        ),
          50
      }
    }
  }
</script>

<form class="w-96" ref="form" on:submit|preventDefault={signInUser}>
  <EmailInput bind:value={email} error={emailError} errorMessage={emailMessage} />
  <PasswordInput bind:value={password} error={passwordError} errorMessage={passwordMessage} />
  <FormButtons cancelButton={false} submitText="Create account" isLoading={disableAction} />
</form>
