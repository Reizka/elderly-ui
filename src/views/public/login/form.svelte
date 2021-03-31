<script>
  import { navigateTo } from 'svelte-router-spa'
  import validate from 'validate.js'
  import PasswordInput from '../../components/forms/password_input.svelte'
  import EmailInput from '../../components/forms/email_input.svelte'
  import FormButtons from '../../components/forms/buttons.svelte'
  // import { notificationMessage } from '../../../stores/notification_message.js'
  import { Auth, Functions } from '../../../config/firebase'

  // const getUser = Functions.httpsCallable('getUser')
  import { getNotificationsContext } from 'svelte-notifications'

  const { addNotification, clearNotifications } = getNotificationsContext()

  const loginConstraints = {
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

  let email = ''
  let emailError = false
  let emailMessage = ''
  let passwordMessage = ''
  let password = ''
  let passwordError = false
  let disableAction = false

  const resetErrorInfo = () => {
    let emailError = false
    let emailMessage = ''
    let passwordMessage = ''
    let passwordError = false
  }

  const validateLoginForm = () => {
    resetErrorInfo()
    clearNotifications()
    const validationResult = validate({ email, password }, loginConstraints)
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

  const signInUser = () => {
    disableAction = true
    validateLoginForm()
    if (validateLoginForm()) {
      Auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          // notificationMessage.set({ message: 'Welcome back!', type: 'success-toast' })
          disableAction = false
          navigateTo('ui-grid')
        })
        .catch((error) => {
          // notificationMessage.set({ message: error.message, type: 'danger-toast' })
          disableAction = false

          addNotification({
            id: 'fb' + new Date().getMilliseconds(),
            text: error.message,
            position: 'bottom-center',
            type: 'danger',
          })
        })
    } else {
      disableAction = false
      if (emailError)
        addNotification({
          id: 'email' + new Date().getMilliseconds(),
          text: emailMessage,
          position: 'bottom-center',
          type: 'danger',
        })
      if (passwordError)
        setTimeout(
          () =>
            addNotification({
              id: 'pw' + new Date().getMilliseconds(),
              text: passwordMessage,
              position: 'bottom-center',
              type: 'danger',
            }),
          50
        )
    }
    console.log('passwordMessage', passwordMessage)
  }
</script>

<form ref="form" on:submit|preventDefault={signInUser}>
  <EmailInput bind:value={email} error={emailError} isFocused={true} errorMessage={emailMessage} />
  <PasswordInput bind:value={password} error={passwordError} errorMessage={passwordMessage} />
  <FormButtons cancelButton={false} submitText="Login" isLoading={disableAction} />
</form>
