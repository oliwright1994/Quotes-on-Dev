// Function declarations

function createNewPostFromInput() {
  let inputFields = document.querySelectorAll('input');
  let newPost = { type: 'post', format: 'standard', status: 'pending' };
  newPost.content = document.querySelector('textarea');
  newPost.excerpt = document.querySelector('textarea');
  newPost.title = inputFields[0].value;
  newPost._qod_quote_source = document.getElementById('quote_source').value;
  newPost._qod_quote_source_url = document.getElementById('quote_url').value;

  return newPost;
}

function toggleSubmitForm() {
  document.getElementById('submit-quote-form').reset;
  jQuery(document).ready(function() {
    jQuery('#submit-quote-form').toggle();
    jQuery('#submit-another-quote-button').toggle();
  });
}

function showStatusMessageOnSubmit(status) {
  let statusMessage = document.createElement('h2');
  statusMessage.innerText = status;
  document.querySelector('.entry-content').append(statusMessage);
}

function displayNotLoggedInError() {
  document.getElementById('submit-quote-form').remove();
  let errorMessage = document.createElement('h2');
  errorMessage.append(
    document.createTextNode('Sorry you must be logged in to submit a quote!')
  );
  let loginURL = document.createElement('a');
  loginURL.append(document.createTextNode('Click here to login.'));
  loginURL.href = api_vars.site_login_url;

  document.querySelector('.entry-content').append(errorMessage);
  document.querySelector('.entry-content').append(loginURL);
}

function displayRandomQuote() {
  jQuery
    .ajax({
      url: api_vars.rest_url + 'wp/v2/any',
      method: 'GET',
      crossDomain: true,
      contentType: 'application/json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
      }
    })
    .done(function(data) {
      clearRandomQuote();
      jQuery('.front-page-quote').append(data[0].post_content);
      jQuery('<h1 class="entry-title"><h1>').appendTo('.front-page-quote');
      jQuery('.entry-title').append('- ' + data[0].post_title);
      console.log(data);
      replaceURLWithPostUrl(data);
    })
    .fail(function() {
      jQuery('.front-page-quote').append('Sorry something went wrong!');
    });
}

function replaceURLWithPostUrl(data) {
  history.replaceState(
    null,
    null,
    api_vars.site_url + '?page_id=' + data[0].ID
  );
}

function clearRandomQuote() {
  jQuery('.front-page-quote').empty();
}

// Main jquery script to run on page load

jQuery(document).ready(function() {
  if (jQuery('main').is('#random-quote-homepage')) {
    displayRandomQuote();
  } else {
    return;
  }
  jQuery('#show-another-quote-button').click(function() {
    displayRandomQuote();
  });

  jQuery('.submit-button').click(function() {
    event.preventDefault();
    if (api_vars.user_logged_in) {
      jQuery
        .ajax({
          url: api_vars.rest_url + 'wp/v2/posts/',
          method: 'post',
          data: JSON.stringify(createNewPostFromInput()),
          crossDomain: true,
          contentType: 'application/json',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce);
          },
          success: function() {
            console.log('Post submitted');
          },
          error: function() {
            console.log('Post not submitted');
            k;
          }
        })
        .done(function() {
          toggleSubmitForm();
          showStatusMessageOnSubmit(api_vars.success);
        })
        .fail(function() {
          toggleSubmitForm();
          showStatusMessageOnSubmit(api_vars.failure);
        });
    } else {
      displayNotLoggedInError();
    }
  });
});
