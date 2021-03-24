<script>
  export let data = []
  export let comments
  export let className = ''
  export let keys = []
  import { findLocalisedRoute } from 'svelte-router-spa/src/lib/utils'
  import App from '../../../App.svelte'
  import Buttons from '../forms/buttons.svelte'
  import Cell from './Cell.svelte'
  import Comment from './Comment.svelte'
  let stateComments = comments
  // export let filterKeys = []

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
    {#each data as d, i (d.code)}
      <tr>
        {#each keys as k (d.code + ' ' + k)}
          <Cell
            code={d.code}
            type={k.toLowerCase()}
            comment={stateComments.find((e) => e.code === d.code)}
            colSize={''}
            data={d[k]}
            className={i % 2 === 1 ? 'bg-indigo-100' : ''}
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
