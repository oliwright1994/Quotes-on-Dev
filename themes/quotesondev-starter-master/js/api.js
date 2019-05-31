let testPost = {};
(testPost.title = 'test123'),
  (testPost.type = 'post'),
  (testPost.content = 'lalalalal'),
  (testPost.format = 'standard'),
  (testPost.status = 'pending'(function($) {
    $(document).ready(function() {
      event.preventDefault();
      $.ajax({
        url: api_vars.rest_url + 'wp/v2/posts/',
        method: 'post',
        data: JSON.stringify(newPost),
        crossDomain: true,
        contentType: 'application/json',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
        },
        success: function(data) {
          console.log(data);
        },
        error: function() {
          console.log(api_vars.failure);
        }
      }).done(function() {
        console.log('well done');
      });
    });
  })(jQuery));
