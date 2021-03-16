<script>
  export let visible = false
  export let type
  export let code
  export let id
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

<textarea
  {id}
  on:input={onChange}
  class="m-2 border h-40 w-80 p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
  placeholder="Please make a comment...">{text}</textarea>
