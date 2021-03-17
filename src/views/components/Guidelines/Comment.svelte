<script>
  export let visible = false
  export let type
  export let code
  export let id
  export let data
  export let onUpload
  import { Functions } from '../../../config/firebase'

  const addComment = Functions.httpsCallable('addComment')
  let text = ''

  const onChange = (e) => {
    console.log('e', e, 'type', type)
    onUpload(true)
    addComment({ [type]: e.target.value, code }).then(() => setTimeout(() => onUpload(false), 100))
  }
</script>

<textarea
  {id}
  on:input={onChange}
  class="m-2 border h-40 w-80 p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
  placeholder="Please make a comment...">{data}</textarea>
