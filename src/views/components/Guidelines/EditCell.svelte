<script>
  import Scroller from './Scroller.svelte'
  import Modal from './EditModal.svelte'
  import { Edit } from 'tabler-icons-svelte'
  export let className
  export let data
  export let colSize = ''
  export let type
  export let code
  export let onUpdateGuideline
  let visible = false

  // console.log('data', data)
  const getLs = () => (data ? data.split('-').filter((d) => d !== '') : [])
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

<td class="p-1 relative border border-indigo-500 {className}">
  {#if getLs(data).length === 1}
    <div class={colSize + ' flex items-center'}>
      <div>{data}</div>
    </div>
  {:else}
    <Scroller>
      <ul class=" m-1 list-disc list-inside max-h-80 overflow-auto {colSize}">
        {#each getLs() as e}
          <li>{e}</li>
        {/each}
      </ul>
    </Scroller>
  {/if}

  <div class="m-1 px-2 py-1 absolute right-0 bottom-0">
    <button class="" on:click={onModalClick}><Edit /></button>
  </div>
  <Modal {visible} {type} {code} onClick={onModalClick} {onUpdateGuideline} {data} />
</td>
