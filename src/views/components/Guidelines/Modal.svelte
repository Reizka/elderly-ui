<script>
  export let visible = false
  export let type
  export let code
  export let onClick

  import { Functions } from '../../../config/firebase'
  import Dialog from '@fouita/dialog'
  import Comment from './Comment.svelte'
  import LikertScale from './LikertScale.svelte'
  import App from '../../../App.svelte'

  //   onMount(() => {
  //     console.log('mount')
  //   })

  const getComment = Functions.httpsCallable('getComment')
  let likert = null
  let GUIDELINE = null
  let CHECK = null
  let isLoading = true
  let upload = false

  $: {
    if (true || visible) {
      isLoading = true
      const promise = getComment({ code }).then((d) => {
        isLoading = false
        if (d.data) {
          if (d.data.likert) likert = +d.data.likert
          if (d.data.GUIDELINE) GUIDELINE = d.data.GUIDELINE
          if (d.data.CHECK) CHECK = d.data.CHECK
        }
      })
    }
  }
</script>

<Dialog inverted color="indigo" rounded="sm" bind:visible title="Comment: {code}" closable={false}>
  {#if isLoading}
    <p>Loading...</p>
  {/if}
  <form class="flex flex-col m-2 {isLoading && 'opacity-0'}">
    <div class="flex flex-col">
      <label class="block text-indigo-500 text-lg" for="check">CHECK:</label>
      <Comment data={CHECK} id="check" {visible} type="CHECK" {code} onUpload={(e) => (upload = e)} />
    </div>

    <div class="flex flex-col">
      <label class="block text-indigo-500 text-lg" for="guide">GUIDELINE:</label>
      <Comment data={GUIDELINE} id="guide" {visible} type="GUIDELINE" {code} onUpload={(e) => (upload = e)} />
    </div>
    <div>
      <label class="block text-indigo-500 text-lg" for="likert">Likert Scale:</label>
      <LikertScale id="likert" {code} data={likert} onUpload={(e) => (upload = e)} />
    </div>
    <button
      disabled={upload}
      class="mx-2 mt-1 mb-2 p-1 bg-indigo-100 text-indigo-900 font-bold"
      on:click|preventDefault={() => {
        onClick()
        // isLoading = true
      }}>{upload ? 'Updating...' : 'Close'}</button>
  </form>
</Dialog>
