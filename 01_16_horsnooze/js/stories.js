"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
  console.debug('getAndShowStoriesOnStart');
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="remove-story">x</span> <span class="toggle-favorite">F</span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */
async function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  storyList = await StoryList.getStories();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
  addEventListeners();
}

async function generateFavoriteStoriesPage(){

  $('#fav-stories-list').empty();
  storyList = await StoryList.getStories();

  console.log(currentUser.favorites);
  for (let story of currentUser.favorites){
    const $story = generateStoryMarkup(story);
    $('#fav-stories-list').append($story);
  }
  $('#fav-stories-list').show();
  addEventListeners();
}

async function generateMyStoriesPage(){

  $('#my-stories-list').empty();
  storyList = await StoryList.getStories();

  for(let story of storyList.stories){
    if(story.username == currentUser.username){
      const $story = generateStoryMarkup(story);
      $('#my-stories-list').append($story);
    }
  }
  $('#my-stories-list').show();
  addEventListeners();
}


async function submitStoryHandler(user, storyParameters){
  const newStory = await storyList.addStory(user, storyParameters);
  putStoriesOnPage();
}