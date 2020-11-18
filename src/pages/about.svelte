<script>
  import { url } from "@sveltech/routify";
</script>

<!-- relative -->
<a href={$url('../')}>Home page</a>

<!-- absolute -->
<a href={$url('/')}>Home page</a>

<!-- params -->
<a href={$url('/:id', { id: '31' })}>Post 31</a>

<h1>ABOUT</h1>
