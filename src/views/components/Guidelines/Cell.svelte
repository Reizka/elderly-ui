<script>
  import Scroller from './Scroller.svelte'
  import { Functions } from '../../../config/firebase'
  import { onMount } from 'svelte'
  export let className
  export let data = []
  export let colSize = ''

  const getComment = Functions.httpsCallable('getComment')
  const getLs = (s) => s.split('-').filter((d) => d !== '')

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
</td>
