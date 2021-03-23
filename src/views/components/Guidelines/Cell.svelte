<script>
  import Scroller from './Scroller.svelte'
  import Modal from './Modal.svelte'
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
  {#if getLs(data).length === 1}
    <div class={colSize + ' flex items-center'}>
      <div>{data}</div>
      {#if type === 'code'}
        <button class="px-2 py-1" on:click={onModalClick}><Edit color={comment ? 'green' : 'red'} /></button>
      {/if}
    </div>
  {:else}
    <Scroller>
      <ul class=" m-1 list-disc list-inside max-h-80 overflow-auto {colSize}">
        {#each getLs(data) as e}
          <li>{e}</li>
        {/each}
      </ul>
    </Scroller>
  {/if}
  <Modal {comment} {visible} {type} {code} onClick={onModalClick} {onComment} />
</td>
