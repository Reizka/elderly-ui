<script>
  import Scroller from './Scroller.svelte'
  import Modal from './Modal.svelte'
  export let className
  export let data = []
  export let colSize = ''
  export let type
  export let code
  let visible = false

  const getLs = (s) => s.split('-').filter((d) => d !== '')
  const onModalClick = () => (visible = !visible)
</script>

<style>
  /* td {
    @apply border border-blue-500;
  } */
  /* .test {
    color: green;
  } */
</style>

<td class="p-1 border border-blue-500 {className}">
  {#if getLs(data).length === 1}
    <div class={colSize}>{data}</div>
  {:else}
    <Scroller>
      <ul class=" m-1 list-disc list-inside max-h-80 overflow-auto {colSize}">
        {#each getLs(data) as e}
          <li>{e}</li>
        {/each}
      </ul>
    </Scroller>
  {/if}
  {#if type === 'check' || type === 'guideline'}
    <button class="px-2 py-1 m-2 border" on:click={onModalClick}>Comment</button>
  {/if}
  <Modal {visible} {type} {code} onClick={onModalClick} />
</td>
