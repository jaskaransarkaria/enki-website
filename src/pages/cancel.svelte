<script>
  import { url } from '@roxi/routify';
</script>

<h1>cancel</h1>
<!-- relative -->
<a href={$url('../enki')}>Home page</a>

<!-- absolute -->
<a href={$url('/enki')}>Home page</a>

<!-- params -->
<a href={$url('/:id', { id: '31' })}>Post 31</a>
