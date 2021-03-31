<script>
  import Scroller from './Scroller.svelte'
  import CommentModal from './AllCommentModal.svelte'
  import { Edit } from 'tabler-icons-svelte'
  export let comments
  export let code
  export let className
  let visible = false

  const getLs = (s) => s.split('-').filter((d) => d !== '')
  const onModalClick = () => (visible = !visible)
  //   console.log('comment cell', comment)
</script>

<style>
  /* td {
    @apply border border-blue-500;
  } */
  /* .test {
    color: green;
  } */
</style>

<td class="p-1 border border-indigo-500 {className} ">
  <div class={'flex items-center'}>
    <div>{code}</div>
    <button class="px-2 py-1" on:click={onModalClick}><Edit /></button>
  </div>
  <CommentModal {code} {visible} {comments} onClick={onModalClick} />
</td>
