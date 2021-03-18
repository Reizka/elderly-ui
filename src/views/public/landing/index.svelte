<script>
  import { Navigate } from 'svelte-router-spa'
</script>

<main class="flex mt-10">
  <div class="m-auto">
    <h3 class="text-5xl mx-auto">Elderly UI</h3>
    <div class="">
      <span class="underline">
        <Navigate to="signup">Create your account!</Navigate>
      </span>
      <p>
        Already have an account?
        <span class="underline">
          <Navigate class="" to="login">Log in</Navigate>
        </span>
      </p>
    </div>
  </div>
</main>
