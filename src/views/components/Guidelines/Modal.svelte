<script>
  export let visible = false
  export let type
  export let code
  export let onClick

  import Dialog from '@fouita/dialog'
  import Comment from './Comment.svelte'

  //   onMount(() => {
  //     console.log('mount')
  //   })
</script>

<Dialog inverted color="blue" rounded="sm" bind:visible title="Comment" closable={false}>
  <div class="flex flex-col">
    <Comment {visible} {type} {code} />
    <button class="mx-2 mt-1 mb-2 p-1 bg-blue-100 text-blue-900 font-bold" on:click={onClick}>Close</button>
  </div>
</Dialog>
