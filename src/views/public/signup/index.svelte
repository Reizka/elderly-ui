<script>
  import { Navigate } from 'svelte-router-spa'

  import SignupForm from './form.svelte'
</script>

<style>
  .mt10 {
    padding-top: 1rem;
  }
</style>

<main class="flex">
  <div class="m-auto">
    <div class="">
      <h3 class="">Svelte & Firebase</h3>
    </div>
    <div class="">
      <span class="">Create your account</span>
      <SignupForm />
      <p>
        <Navigate to="login">Already have an account? Log in</Navigate>
      </p>
    </div>
  </div>
</main>
