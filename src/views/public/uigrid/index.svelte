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

  import { Functions } from '../../../config/firebase'
  import { currentUser } from '../../../stores/current_user'

  const getAllComments = Functions.httpsCallable('getAllComments')
  const getAllGuidelines = Functions.httpsCallable('getAllGuidelines')
  const getAUC = Functions.httpsCallable('getAUC')
  let promise1 = null
  let promise2 = null
  let promise3 = null
  $: admin = $currentUser && $currentUser.admin
  // onMount(() => {

  $: {
    if ($currentUser) {
      promise1 = getAllComments({ email: $currentUser.email }).then((e) => {
        return e.data
      })
      promise2 = getAllGuidelines({}).then((e) => e.data)
      // setTimeout(() => {
      promise3 = getAUC().then((e) => e.data)
      // }, 500)
    }
  }
  // })
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
      {#if promise1}
        {#await promise1}
          <p class="text-6xl m-auto">Loading Comments...</p>
        {:then comments}
          {#await promise2}
            <p class="text-6xl m-auto">Loading Guidelines...</p>
          {:then guidelines}
            {#if admin}
              {#await promise3}
                <p class="text-6xl m-auto">Loading allComments...</p>
              {:then allComments}
                <Guidelines {comments} {extended} {guidelines} {allComments} />
              {/await}
            {:else}
              <Guidelines {comments} {extended} {guidelines} />
            {/if}
          {/await}
        {/await}
      {/if}
    </div>
  </div>
  <!-- <HowToUseIt /> -->
  <!-- <Footer /> -->
</div>
