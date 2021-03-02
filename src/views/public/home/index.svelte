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

<div>
  <div class="">
    <h1>Elderly UI</h1>
    <Guidelines />
    <p>This the project!!!</p>
    <Navigate to="login">Login</Navigate>
    <Navigate to="signup">signup</Navigate>
  </div>
  <!-- <HowToUseIt /> -->
  <!-- <Footer /> -->
</div>
