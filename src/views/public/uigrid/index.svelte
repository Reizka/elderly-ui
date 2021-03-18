<script>
  import { navigateTo } from 'svelte-router-spa'
  import { Auth } from '../../../config/firebase'

  import TogglerBtn from '../../components/TogglerBtn.svelte'
  import Guidelines from '../../components/Guidelines/index.svelte'

  let extended = false

  const signout = () =>
    Auth.signOut().then(
      () => {
        console.log('Signed Out')
        navigateTo('/')
      },
      (error) => {
        console.error('Sign Out Error', error)
      }
    )
</script>

<div class="flex {!extended && 'justify-center'}">
  <div class="m-8 relative">
    <div class="fixed right-0 pr-3">
      <TogglerBtn
        onClick={() => (extended = !extended)}
        firstValue={'default'}
        secValue="extended"
        state={extended ? 'extended' : 'default'} />
    </div>

    <div class="flex items-center">
      <h1 class="text-5xl mb-3 mr-3">Elderly UI</h1>
      <button class="border bg-indigo-200 text-lg p-1 rounded-sm font-bold " on:click={signout}> Sign out </button>
    </div>
    <div class="pr-48">
      <Guidelines {extended} />
    </div>
  </div>
  <!-- <HowToUseIt /> -->
  <!-- <Footer /> -->
</div>
