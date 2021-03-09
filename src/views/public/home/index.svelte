<script>
  import { onMount } from 'svelte'
  import { Navigate } from 'svelte-router-spa'

  import TogglerBtn from '../../components/TogglerBtn.svelte'
  import Guidelines from '../../components/Guidelines/index.svelte'

  onMount(() => {
    console.log('index -> on mount')
    // const elems = document.querySelectorAll('.parallax')
    // M.Parallax.init(elems, {})
  })
  let extended = false
</script>

<style>
  .parallax {
    height: 750px;
  }
  .all-width {
    width: 100%;
  }
</style>

<div class="flex {!extended && 'justify-center'}">
  <div class="m-8 relative">
    <div class="fixed right-0 pr-3">
      <TogglerBtn
        onClick={() => (extended = !extended)}
        firstValue={'default'}
        secValue="extended"
        state={extended ? 'extended' : 'default'} />
    </div>
    <h1 class="text-5xl mb-3 ">Elderly UI</h1>
    <div class="pr-48">
      <Guidelines {extended} />
      <Navigate to="login">Login</Navigate>
      <Navigate to="signup">signup</Navigate>
    </div>
  </div>
  <!-- <HowToUseIt /> -->
  <!-- <Footer /> -->
</div>
