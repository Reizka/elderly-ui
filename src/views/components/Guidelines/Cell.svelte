<script>
  import Scroller from './Scroller.svelte'
  import Modal from './CommentModal.svelte'
  import { Edit } from 'tabler-icons-svelte'
  import CommentCell from './CommentCell.svelte'
  import EditCell from './EditCell.svelte'
  import RestCell from './RestCell.svelte'
  import { currentUser } from '../../../stores/current_user'
  import AllCommentCell from './AllCommentCell.svelte'
  export let className
  export let data
  export let type
  export let code
  export let onComment
  export let comment
  export let onUpdateGuideline
  export let commentsByCode
  let visible = false

  $: admin = $currentUser && $currentUser.admin

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

{#if type === 'code' && !admin}
  <CommentCell {className} {data} {type} {code} {onComment} {comment} />
{/if}
{#if type === 'code' && admin}
  <AllCommentCell {code} comments={commentsByCode.get(code)} {className} />
{/if}

{#if (type === 'CHECK' || type === 'GUIDELINE') && admin}
  <EditCell {className} {data} {type} {code} {onUpdateGuideline} />
{/if}

{#if (type === 'CHECK' || type === 'GUIDELINE') && !admin}
  <RestCell {className} {data} {code} />
{/if}

{#if type === 'c_HEUMLE' || type === 'c_SW' || type === 'c_WCAG' || type === 'c_D4ALL' || type === 'auth_note'}
  <RestCell {className} {data} {code} />
{/if}
