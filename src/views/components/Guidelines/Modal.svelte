<script>
  export let visible = false
  export let type
  export let code
  export let onClick

  import Dialog from '@fouita/dialog'
  import Comment from './Comment.svelte'
  import LikertScale from './LikertScale.svelte'

  //   onMount(() => {
  //     console.log('mount')
  //   })
</script>

<Dialog inverted color="indigo" rounded="sm" bind:visible title="Comment" closable={false}>
  <form class="flex flex-col m-2">
    <div class="flex flex-col">
      <label class="block text-indigo-500" for="check">CHECK:</label>
      <Comment id="check" {visible} type="CHECK" {code} />
    </div>

    <div class="flex flex-col">
      <label class="block text-indigo-500" for="guide">GUIDELINE:</label>
      <Comment id="guide" {visible} type="GUIDELINE" {code} />
    </div>
    <div>
      <label class="block text-indigo-500" for="likert">Likert Scale</label>
      <LikertScale id="likert" {code} />
    </div>
    <button
      class="mx-2 mt-1 mb-2 p-1 bg-indigo-100 text-indigo-900 font-bold"
      on:click|preventDefault={onClick}>Save</button>
  </form>
</Dialog>
