<script>
  export let data = []
  export let className = ''
  export let keys = []
  // export let filterKeys = []

  import Scroller from './Scroller.svelte'
  console.log('data', data)

  const getColSize = (k) => {
    if (keys.length < 5 && k !== 'code') return 'w-96'
    switch (k) {
      // case 'c_D4ALL':
      //   return 'w-96'
      // case 'c_WCAG':
      //   return 'w-60'
      // case 'c_SW':
      //   return 'w-60'
      // case 'c_HEUMLE':
      //   return 'w-60'
      // case 'GUIDELINE':
      //   return ''
      // case 'CHECK':
      //   return 'w-60'
      default:
        return ''
    }
  }
  const getLs = (s) => s.split('-').filter((d) => d !== '')
  //   const filterDict = filterKeys.reduce((acc, d) => ({ ...acc, [d.id]: d.selected }), {})
</script>

<style>
  td {
    @apply border border-blue-500;
  }
  /* .test {
    color: green;
  } */
</style>

<div class="">
  <table class=" table-fixed transition-all ">
    <thead />
    <tr>
      {#each keys as k, i (i)}
        <th class={getColSize(k)}>{k}</th>
      {/each}
    </tr>
    {#each data as d, i (i)}
      <tr>
        {#each keys as k (k)}
          <td class="p-1 {i % 2 === 1 ? 'bg-blue-100' : ''}">
            {#if getLs(d[k]).length === 1}
              <div class={getColSize(k)}>{d[k]}</div>
            {:else}
              <Scroller>
                <ul class=" m-1 list-disc list-inside max-h-80 overflow-auto {getColSize(k)}">
                  {#each getLs(d[k]) as e}
                    <li>{e}</li>
                  {/each}
                </ul>
              </Scroller>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
