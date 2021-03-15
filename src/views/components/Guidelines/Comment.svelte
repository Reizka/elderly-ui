<script>
  export let visible = false
  export let type
  export let code
  import { Functions } from '../../../config/firebase'

  const getComment = Functions.httpsCallable('getComment')
  const addComment = Functions.httpsCallable('addComment')
  let text = ''

  const onChange = (e) => {
    console.log('e', e, 'type', type)
    addComment({ [type]: e.target.value, code })
  }
  if (visible) {
    const promise = getComment({ code }).then((d) => {
      console.log('d', d)

      if (d.data && d.data[type]) text = d.data[type]
    })
  }
</script>

<textarea on:input={onChange} class="m-2 border w-80 h-40" placeholder="Please make a comment...">{text}</textarea>
