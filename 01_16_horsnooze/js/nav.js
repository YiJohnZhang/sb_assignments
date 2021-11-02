"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $('.stories-container').show();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $('.account-forms-container').show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  
  addEventListeners();
  $(".main-nav-links").show();
  $navLogin.hide();
  $('.stories-container').show();
  $('.addStory-container').hide();
  $('.nav-userInterface').hide();

  $navLogOut.show();
  $('.nav-userInterface').show();
  $navUserProfile.text(`${currentUser.username}`).show();
  
  $loginForm.hide();
  $signupForm.hide();
}

/**when a nav item is clicked */
$('.nav-userInterface').on('click', updateBody);

function updateBody(evt){

  console.debug('updatePage')
  $('.container').hide();
  $('.container').removeClass('visible');

  if(this.id == 'nav-submitStory'){
    putStoriesOnPage();
    $('.addStory-container').show();
    $('.stories-container').show();
    $('.stories-container').addClass('visible');
  }else if(this.id == 'nav-favorites'){
    generateFavoriteStoriesPage();
    $('.favoriteStories-container').show();
    $('.favoriteStories-container').addClass('visible');
  }else if(this.id == 'nav-myStories'){
    generateMyStoriesPage();
    $('.myStories-container').show();
    $('.myStories-container').addClass('visible');
  }
}

function checkContainerVisibility(){
  if($('.stories-container').hasClass('visible')){
    putStoriesOnPage();
  }else if($('.favoriteStories-container').hasClass('visible')){
    generateFavoriteStoriesPage();
  }else if($('.myStories-container').hasClass('visible')){
    generateMyStoriesPage();
  }
}

function addEventListeners(){  

  console.debug('add event listeners');
  
  $('#input-submitStory').on('click', function(){
    submitStoryHandler(currentUser, {
     'title': $('#input-postTitle').val(),
     'author': $('#input-authorName').val(),
      'url': $('#input-postURL').val()
    })
  });

  $('.remove-story').on('click', function(){
    removeStory(currentUser, $(this).parent().attr('id'));
  });

  $('.toggle-favorite').on('click', function(){
    toggleFavorteHandler(currentUser, $(this).parent().attr('id'));
  });

}