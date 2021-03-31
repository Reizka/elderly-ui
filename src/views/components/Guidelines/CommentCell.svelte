<script>
  import Scroller from './Scroller.svelte'
  import CommentModal from './CommentModal.svelte'
  import { Edit } from 'tabler-icons-svelte'
  export let className
  export let data = []
  export let colSize = ''
  export let type
  export let code
  export let onComment
  export let comment
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

<td class="p-1 border border-indigo-500 {className}">
  <div class={colSize + ' flex items-center'}>
    <div>{data}</div>
    <button class="px-2 py-1" on:click={onModalClick}><Edit color={comment ? 'green' : 'red'} /></button>
  </div>
  <CommentModal {comment} {visible} {code} onClick={onModalClick} {onComment} />
</td>
