<script>
  import { csvParse } from 'd3-dsv'
  import { group } from 'd3-array'
  // import { onMount } from 'svelte'

  export let extended = false
  export let comments = []
  export let allComments
  export let guidelines
  import GuideLinePage from './GuidelinesPage.svelte'

  $: commentsByCode = allComments
    ? group(
        allComments.flatMap((d) => d.comments),
        (d) => d.code
      )
    : new Map()

  const promise0 = fetch('/cetools.csv')
    .then((response) => response.text())
    .then((data) => {
      const lines = csvParse(data)
      // const keys = Object.keys(lines[0])

      const getBool = (d) => {
        if (d === 'y') return true
        if (d === 'n') return false
        return d
      }
      return lines.map((d, i) => {
        const nd = Object.keys(d).reduce(
          (acc, k) => ({ ...acc, [k.replace(/\n|\↵|\s| /g, '')]: d[k].replace(/\n|\↵|\r?\n|\r/g, '') }),
          {}
        )
        const newNd = Object.keys(nd).reduce((acc, k) => ({ ...acc, [k]: getBool(nd[k]) }), {})
        return {
          ...newNd,
          id: d.code,
        }
      })
    })
  console.log('guidelines', guidelines)
</script>

{#if promise0}
  {#await promise0}
    <p class="text-6xl m-auto">Loading Spreadsheet...</p>
  {:then data}
    <GuideLinePage {data} {comments} {extended} {guidelines} {commentsByCode} />
  {/await}
{/if}
