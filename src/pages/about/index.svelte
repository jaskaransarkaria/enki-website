<div class="container">
  <h1>About Enki</h1>
  <div class="shop-pics">
    <img
      src="https://enki.imgix.net/left_enki.jpg?auto=format"
      alt="a rectangular wooden display inside the shop"
    />
    <img
      class="center-image"
      src="https://enki.imgix.net/outside_enki_1.png?auto=format"
      alt="the shop front and it's window display"
    />
    <img
      src="https://enki.imgix.net/right_enki.png?auto=format"
      alt="a wooden jeweller's work bench inside the shop"
    />
  </div>
  <p>
    Enki was started by Faith, a Birmingham trained jeweller who wanted to make
    a small contribution towards saving the dying jewellery trade from high
    street chains and overseas mass production. As well as making her own
    jewelelry collections she repairs old jewellery and teaches classes in an
    attempt to share her skills with the rest of Birmingham.<br /><br />The
    Kings Heath store shows the work of many independent crafts people who have
    become almost invisible on the high street today. From baby clothes to
    pottery, jewellery to cushions, Enki has just the gift you're looking for.
    They also sell beautiful and unique cards have a free gift wrapping service
    to make your present that bit more special. Faith grew up in the Welsh
    borders and moved to Birmingham in 2012 to attend the school of jewellery
    and has never looked back. After a year as artist in residence at the school
    and working in a few companies in the jewelelry quarter she decided to go
    out on her own and opened Enki in 2017. She has always liked making things
    and has had a passion for repairing things too.
  </p>
  <h2>Meet the team</h2>
  <div class="employee-cards">
    <div class="card">
      <img
        src="https://enki.imgix.net/faith.jpg?auto=format"
        alt="shop owner faith"
      />
      <p>Faith blah blah</p>
    </div>
    <div class="card">
      <img
        src="https://enki.imgix.net/faith.jpg?auto=format"
        alt="shop owner faith"
      />
      <p>Faith blah blah</p>
    </div>
    <div class="card">
      <img
        src="https://enki.imgix.net/faith.jpg?auto=format"
        alt="shop owner faith"
      />
      <p>Faith blah blah</p>
    </div>
  </div>
</div>

<style>
  h1,
  h2 {
    text-align: center;
    font-family: 'WelcomeHome3 Regular';
  }

  .container {
    display: flex;
    min-height: 100vh;
    width: 100vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .shop-pics {
    display: flex;
    flex-direction: row;
    height: 10%;
    width: 70%;
    align-self: center;
    justify-content: center;
  }

  .shop-pics > * {
    width: 30%;
    padding: 5px;
  }

  .center-image {
    width: 60%;
  }

  p {
    width: 60%;
    align-self: center;
    text-align: center;
    font-family: 'Caviar Dreams';
  }

  .employee-cards {
    width: 70%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 30px;
  }

  .card {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .card > img {
    width: 60%;
  }
</style>
