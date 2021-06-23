<script>
  import { Navigate } from 'svelte-router-spa'

  import SignupForm from './form.svelte'
</script>

<style>
  .mt10 {
    padding-top: 1rem;
  }
</style>

<main class="flex mt-10">
  <div class="m-auto">
    <h3 class="text-3xl mx-auto">Elderly UI2</h3>
    <div class="">
      <span class="mb-3">Create your account</span>
      <SignupForm />
      <p class="underline">
        <Navigate class="" to="login">Already have an account? Log in</Navigate>
      </p>
    </div>
  </div>
</main>
