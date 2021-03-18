<script>
  export let data = []
  import GuidelinesGrid from './GuidelinesGrid.svelte'
  import FilterMenu from './FilterMenu.svelte'
  export let extended = false

  // const getComment = Functions.httpsCallable('getComment')

  // onMount(()=> {
  //   getComment();

  // })

  const keys0 = ['code', 'CHECK', 'GUIDELINE', 'c_HEUMLE', 'c_SW', 'c_WCAG', 'c_D4ALL'] //Object.keys(data[0])
  const keys1 = ['code', 'CHECK', 'GUIDELINE'] //Object.keys(data[0])
  const filterKeysArray = [
    'color',
    'customization',
    'datainput',
    'element-content',
    'element-interaction',
    'element-size',
    // 'element-placing',
    'General',
    'errors',
    'feedback',
    'font',
    'icon/image/graphics',
    'multimodal',
    'navigation',
    'screendesign(appearance)',
    'specialneeds',
    'supplementarydevice/tool',
    'text',
    'touchscreenspecific',
    'webspecific',
  ]
  let filterKeys = filterKeysArray.map((k) => ({ id: k, selected: false }))
  let filteredData = []
  $: {
    // console.log('filterKeys', filterKeys)

    filteredData = data.filter((d) => {
      return filterKeys.filter((d) => d.selected).every((k) => d[k.id])
    })
    console.log('filterKeys', filterKeys)
    console.log('filteredData', filteredData)
    console.log('data', data)
  }
</script>

<div class="relative" style={extended ? '' : 'max-width: 1000px'}>
  <FilterMenu keys={filterKeys} onChange={(ks) => (filterKeys = ks)} />
  <GuidelinesGrid data={filteredData} keys={extended ? keys0 : keys1} className="mt-2 {!extended && 'w-1/2'}" />
</div>
