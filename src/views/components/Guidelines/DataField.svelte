<script>
  export let visible = false
  export let type
  export let code
  export let id
  export let data
  export let onUpload
  import { Functions } from '../../../config/firebase'

  import { currentUser } from '../../../stores/current_user'

  const updateGuideline = Functions.httpsCallable('updateGuideline')
  let text = ''

  const onChange = (e) => {
    console.log('e', e, 'type', type)
    onUpload(true)
    updateGuideline({ [type]: e.target.value, code }).then(() =>
      setTimeout(() => onUpload(false, { [type]: e.target.value }), 50)
    )
  }
</script>

<textarea
  {id}
  on:input={onChange}
  class="m-2 border h-40 w-96 p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
  placeholder="Please make a comment...">{data}</textarea>
