<script>
  import Scroller from './Scroller.svelte'
  import { Edit } from 'tabler-icons-svelte'
  export let className
  export let data
  let visible = false

  const getLs = () => (data ? data.split('-').filter((d) => d !== '') : [])
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
  {#if getLs().length === 1}
    <div class={' flex items-center'}>
      <div>{data}</div>
    </div>
  {:else}
    <Scroller>
      <ul class=" m-1 list-disc list-inside max-h-80 overflow-auto ">
        {#each getLs(data) as e}
          <li>{e}</li>
        {/each}
      </ul>
    </Scroller>
  {/if}
</td>
