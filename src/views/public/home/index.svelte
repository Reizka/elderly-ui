<script>
  import { onMount } from 'svelte'
  import { Navigate } from 'svelte-router-spa'
  import Guidelines from '../../components/Guidelines/index.svelte'

  onMount(() => {
    console.log('index -> on mount')
    // const elems = document.querySelectorAll('.parallax')
    // M.Parallax.init(elems, {})
  })
</script>

<style>
  .parallax {
    height: 750px;
  }
  .all-width {
    width: 100%;
  }
</style>

<div class="">
  <div class="p-8">
    <h1 class="text-5xl mb-3">Elderly UI</h1>
    <div class="">
      <Guidelines />
      <Navigate to="login">Login</Navigate>
      <Navigate to="signup">signup</Navigate>
    </div>
  </div>
  <!-- <HowToUseIt /> -->
  <!-- <Footer /> -->
</div>
