<script>
  export let data = []
  export let className = ''
  export let keys = []
  export let filterKeys = []
  console.log('data', data)

  const getColSize = (k) => {
    switch (k) {
      case 'c_D4ALL':
        return 'w-96'
      case 'c_WCAG':
        return 'w-60'
      case 'c_SW':
        return 'w-60'
      case 'c_HEUMLE':
        return 'w-60'
      case 'GUIDELINE':
        return 'w-60'
      case 'CHECK':
        return 'w-60'
      default:
        return 'w-10'
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

<div class={className}>
  <table class=" table-fixed transition-all">
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
              {d[k]}
            {:else}
              <ul class=" m-1 list-disc list-inside max-h-80 overflow-auto {getColSize(k)}">
                {#each getLs(d[k]) as e}
                  <li>{e}</li>
                {/each}
              </ul>
            {/if}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
