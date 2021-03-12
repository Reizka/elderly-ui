<script>
  import Scroller from './Scroller.svelte'
  import { Functions } from '../../../config/firebase'
  import { onMount } from 'svelte'
  import Dialog from '@fouita/dialog'
  export let className
  export let data = []
  export let colSize = ''
  let visible = false
  function toggle() {
    visible = !visible
  }

  const getComment = Functions.httpsCallable('getComment')
  const addComment = Functions.httpsCallable('addComment')
  const getLs = (s) => s.split('-').filter((d) => d !== '')

  const onChange = (e) => {
    console.log('e', e)
    addComment({ check: 'blalbla', code: '1' })
  }

  onMount(() => {
    console.log('mount')
    getComment({ code: 1 }).then((d) => console.log('d', d))
  })
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
  <button class="px-4 py-2 m-2 border" on:click={toggle}>Toggle</button>
</td>
<Dialog bind:visible title="Comment"><textarea on:change={onChange} class="m-2 border w-80 h-40" /></Dialog>
