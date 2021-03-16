<script>
  import { Navigate } from 'svelte-router-spa'

  import LoginForm from './form.svelte'
</script>

<style>
  .mt10 {
    padding-top: 1rem;
  }
</style>

<main>
  <div class="flex flex-col">
    <div class="mx-auto w-96">
      <h3 class="mt-10 text-3xl">Elderly UI</h3>
      <span class="card-title center-align">Log In</span>
      <LoginForm />
      <p class="underline">
        <Navigate to="signup">Create an account.</Navigate>
      </p>
    </div>
  </div>
</main>
