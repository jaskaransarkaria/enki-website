<script>
  import { url } from '@roxi/routify';
</script>

<!-- absolute -->
<a href={$url('/what-we-offer')}>Home page</a>

<div class="contact-us-container">
  <img src="/faith.jpg" alt="shop creator and jeweller" />
  <div class="contact-description">
    <p>
      Enki was started by Faith, a Birmingham trained jeweller who as well as
      repairing and remodeling old jewellery offers personal service creating
      bespoke jewellery using traditional techniques just for you.
    </p>
    <p>
      The Kings Heath store shows the work of many independent crafts people who
      have become almost invisible on the High Street today. From baby clothes
      to pottery, jewellery to cushions, Enki has just the gift you're looking
      for. They also sell beautiful and unique cards and wrapping paper to make
      your present that bit more special.
    </p>
  </div>
</div>

<style>
  .contact-us-container {
    display: flex;
    padding: 20px;
    margin: 8% 30%;
    /* overflow: hidden; */
  }

  p {
    font-size: 1.8rem;
    font-weight: 200px;
  }

  img {
    width: 450px;
    height: 800px;
    object-fit: cover;
  }

  .contact-description {
    margin: -30px 20px 0px;
    padding: 0px 60px 0px;
    width: 450px;
  }
</style>
