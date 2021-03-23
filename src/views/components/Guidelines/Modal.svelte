<script>
  export let visible = false
  export let comment
  export let code
  export let onClick
  export let onComment

  import { Functions } from '../../../config/firebase'
  import Dialog from '@fouita/dialog'
  import Comment from './Comment.svelte'
  import LikertScale from './LikertScale.svelte'
  import { currentUser } from '../../../stores/current_user'

  //   onMount(() => {
  //     console.log('mount')
  //   })

  const getComment = Functions.httpsCallable('getComment')
  let likert
  let GUIDELINE
  let CHECK
  $: {
    likert = comment ? +comment.likert : null
    GUIDELINE = comment ? comment.GUIDELINE : null
    CHECK = comment ? comment.CHECK : null
  }

  let isLoading = false
  let upload = false

  //   $: {
  //     if (visible) {
  //       isLoading = true
  //       const promise = getComment({ code, email: $currentUser.email }).then((d) => {
  //         isLoading = false
  //         if (d.data) {
  //           if (d.data.likert) likert = +d.data.likert
  //           if (d.data.GUIDELINE) GUIDELINE = d.data.GUIDELINE
  //           if (d.data.CHECK) CHECK = d.data.CHECK
  //         }
  //       })
  //     }
  //     // console.log('currentUser', $currentUser)
  //   }
  const onUpload = (e, obj) => {
    upload = e
    const c = { code, likert, GUIDELINE, CHECK, ...obj }
    console.log('c', c)
    onComment(c)
  }
</script>

<Dialog inverted color="indigo" rounded="sm" bind:visible title="Comment: {code}" closable={false}>
  <div class="relative">
    {#if isLoading}
      <p class="absolute m-auto text-xl" style="top: 50%; left:40%">Loading...</p>
    {/if}
    <form class="flex flex-col m-2 {isLoading && 'opacity-0'}">
      <div class="flex flex-col">
        <label class="block text-indigo-500 text-lg" for="check">CHECK:</label>
        <Comment data={CHECK} id="check" {visible} type="CHECK" {code} {onUpload} />
      </div>

      <div class="flex flex-col">
        <label class="block text-indigo-500 text-lg" for="guide">GUIDELINE:</label>
        <Comment data={GUIDELINE} id="guide" {visible} type="GUIDELINE" {code} {onUpload} />
      </div>
      <div>
        <label class="block text-indigo-500 text-lg" for="likert">Do you see this guideline important?</label>
        <LikertScale id="likert" {code} data={likert} {onUpload} />
      </div>
      <button
        disabled={upload}
        class="mx-2 mt-1 mb-2 p-1 bg-indigo-100 text-indigo-900 font-bold"
        on:click|preventDefault={() => {
          onClick()
          // isLoading = true
        }}>{upload ? 'Updating...' : 'Close'}</button>
    </form>
  </div>
</Dialog>
