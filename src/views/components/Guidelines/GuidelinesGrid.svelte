<script>
  export let data = []
  export let className = ''
  export let keys = []
  import Cell from './Cell.svelte'
  // export let filterKeys = []

  console.log('data', data)

  const getColSize = (k) => {
    // if (keys.length < 5 && k !== 'code') return ''
    // switch (k) {
    //   // case 'c_D4ALL':
    //   //   return 'w-96'
    //   // case 'c_WCAG':
    //   //   return 'w-60'
    //   // case 'c_SW':
    //   //   return 'w-60'
    //   // case 'c_HEUMLE':
    //   //   return 'w-60'
    //   // case 'GUIDELINE':
    //   //   return ''
    //   // case 'CHECK':
    //   //   return 'w-60'
    //   default:
    //     return ''
    // }
    return ''
  }
  //   const filterDict = filterKeys.reduce((acc, d) => ({ ...acc, [d.id]: d.selected }), {})
</script>

<div class="">
  <table class=" table-fixed transition-all rounded">
    <thead />
    <tr>
      {#each keys as k, i (i)}
        <th class={getColSize(k)}>{k}</th>
      {/each}
    </tr>
    {#each data as d, i (i)}
      <tr>
        {#each keys as k (k)}
          <Cell
            code={d.code}
            type={k.toLowerCase()}
            colSize={getColSize(k)}
            data={d[k]}
            className={i % 2 === 1 ? 'bg-indigo-100' : ''} />
        {/each}
      </tr>
    {/each}
  </table>
</div>
