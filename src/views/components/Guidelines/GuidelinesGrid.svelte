<script>
  export let data = []
  export let comments
  export let guidelines
  export let keys = []
  export let commentsByCode
  import Cell from './Cell.svelte'
  let stateComments = comments
  let stateGuidelines = []
  $: {
    const gls = guidelines.map((g) => {
      const d = data.find((d) => d.code === d.code)
      return { ...d, ...g }
    })
    const glCodes = gls.map((d) => d.code)

    stateGuidelines = [...gls, ...data.filter((d) => !glCodes.includes(d.code))].sort((a, b) => {
      if (+a.code < +b.code) return -1
      if (+a.code > +b.code) return 1
      return 0
    })
  }
  // export let filterKeys = []
  console.log('guidelines', guidelines)

  const getGuideline = (d, k) => {
    // console.log('d', d)
    const gl = stateGuidelines.find((e) => e.code === d.code)
    console.log('newgl', gl)
    // console.log('dk', d[k])
    return gl ? gl[k] : d[k]
  }
  // console.log('data', data, 'comments', comments)
</script>

<div class="">
  <table class=" table-fixed transition-all rounded">
    <thead />
    <tr>
      {#each keys as k, i (i)}
        <th>{k}</th>
      {/each}
    </tr>
    {#each stateGuidelines as d, i (d.code)}
      <tr>
        {#each keys as k (d.code + ' ' + k)}
          <Cell
            code={d.code}
            type={k}
            comment={stateComments.find((e) => e.code === d.code)}
            data={d[k]}
            {commentsByCode}
            className={i % 2 === 1 ? 'bg-indigo-100' : ''}
            onUpdateGuideline={(e) => {
              const c = stateGuidelines.find((c) => c.code === e.code)
              const newgl = { ...d, ...e }
              if (!c) {
                stateGuidelines = [newgl, ...stateGuidelines]
              } else {
                stateGuidelines = [newgl, ...stateGuidelines.filter((d) => d.code !== e.code)]
                console.log('stateguidelines', stateGuidelines)
              }
            }}
            onComment={(e) => {
              const c = stateComments.find((c) => c.code === e.code)
              if (!c) {
                stateComments = [e, ...stateComments]
              } else {
                stateComments = [e, ...stateComments.filter((d) => d.code !== e.code)]
                console.log('yeah')
              }
              // c = e
            }} />
        {/each}
      </tr>
    {/each}
  </table>
</div>
