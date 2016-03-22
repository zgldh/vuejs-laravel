<template>

  <site-nav></site-nav>

  <div class="pusher">
    <div class="ui inverted vertical masthead center aligned segment">
      <div class="ui text container">
        <h1 class="ui inverted header">
          有那么一家公司
        </h1>
        <h2>任何时候想干什么就干什么</h2>
        <div class="ui huge primary button">现在开始 <i class="right arrow icon"></i></div>
      </div>
    </div>
    <div class="ui vertical stripe segment">
      <div class="ui text container">
        <h3 class="ui header">Breaking The Grid, Grabs Your Attention</h3>
        <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing
          by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth
          your attention.</p>
        <a class="ui large button">Read More</a>
        <h4 class="ui horizontal header divider">
          <a href="#">Case Studies</a>
        </h4>
        <h3 class="ui header">Did We Tell You About Our Bananas?</h3>
        <p>Yes I know you probably disregarded the earlier boasts as non-sequitor filler content, but its really true.
          It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
        <a class="ui large button">I'm Still Quite Interested</a>
      </div>
    </div>
    <div class="ui inverted vertical footer segment">
      <div class="ui container">
        <div class="ui stackable inverted divided equal height stackable grid">
          <div class="three wide column">
            <h4 class="ui inverted header">About</h4>
            <div class="ui inverted link list">
              <a href="#" class="item">Sitemap</a>
              <a href="#" class="item">Contact Us</a>
              <a href="#" class="item">Religious Ceremonies</a>
              <a href="#" class="item">Gazebo Plans</a>
            </div>
          </div>
          <div class="three wide column">
            <h4 class="ui inverted header">Services</h4>
            <div class="ui inverted link list">
              <a href="#" class="item">Banana Pre-Order</a>
              <a href="#" class="item">DNA FAQ</a>
              <a href="#" class="item">How To Access</a>
              <a href="#" class="item">Favorite X-Men</a>
            </div>
          </div>
          <div class="seven wide column">
            <h4 class="ui inverted header">Footer Header</h4>
            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  require('../../semantic/dist/semantic.js')
  var SiteNav = require('./Common/SiteNav')

  export default {
    components: {
      SiteNav
    }
  }
</script>

<style scoped>
  @import "../../semantic/dist/semantic.css";

  .masthead.segment {
    min-height: 700px;
    padding: 1em 0em;
  }

  .masthead .logo.item img {
    margin-right: 1em;
  }

  .masthead .ui.menu .ui.button {
    margin-left: 0.5em;
  }

  .masthead h1.ui.header {
    margin-top: 3em;
    margin-bottom: 0em;
    font-size: 4em;
    font-weight: normal;
  }

  .masthead h2 {
    font-size: 1.7em;
    font-weight: normal;
  }

  .ui.vertical.stripe {
    padding: 8em 0em;
  }

  .ui.vertical.stripe h3 {
    font-size: 2em;
  }

  .ui.vertical.stripe .button + h3,
  .ui.vertical.stripe p + h3 {
    margin-top: 3em;
  }

  .ui.vertical.stripe .floated.image {
    clear: both;
  }

  .ui.vertical.stripe p {
    font-size: 1.33em;
  }

  .ui.vertical.stripe .horizontal.divider {
    margin: 3em 0em;
  }

  .quote.stripe.segment {
    padding: 0em;
  }

  .quote.stripe.segment .grid .column {
    padding-top: 5em;
    padding-bottom: 5em;
  }

  .footer.segment {
    padding: 5em 0em;
  }

  @media only screen and (max-width: 700px) {

    .masthead.segment {
      min-height: 350px;
    }

    .masthead h1.ui.header {
      font-size: 2em;
      margin-top: 1.5em;
    }

    .masthead h2 {
      margin-top: 0.5em;
      font-size: 1.5em;
    }
  }
</style>
