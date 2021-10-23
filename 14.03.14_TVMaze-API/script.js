/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const axiosResponse = await axios.get('http://api.tvmaze.com/search/shows',{params: {'q':query}});

  return axiosResponse.data.map((element) => {
    return {'id':element.show.id, 'name':element.show.name, 'summary':element.show.summary, 'image':element.show.image}
  });

}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    if(show.image == null){
      show.image = 'https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300';
    }else{
      show.image = show.image.original;
    }
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <img class="card-img-top" src="${show.image}"> 
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
         <button class='button_showEpisodes' type='submit'>Show Episodes</button>
       </div>
      `);

    $showsList.append($item);
  }
  $('.button_showEpisodes').on("click", loadEpisodesHandler);
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */
async function handleSearch(evt){
  evt.preventDefault();

  const query = $('#search-query').val();
  if(!query)
    return;
  
    $('#episodes-area').hide();

    const shows = await searchShows(query);
    populateShows(shows);

}

$("#search-form").on("submit", handleSearch);


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

function loadEpisodesHandler(evt){

  evt.preventDefault();
  getEpisodes($(this).parent().attr('data-show-id'));

}

async function getEpisodes(id) {
  
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above

  $episodeInformationParent = $('#episodes-list');
  $episodeInformationParent.text('');
  $episodeInformationParent.children().remove();

  const axiosResponse = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);

  populateEpisodes(axiosResponse.data);

}

function populateEpisodes(episodeArray){

  $episodesInformationContainer = $('#episodes-area');
  $episodeInformationParent = $('#episodes-list');

  for (episode of episodeArray){

    const $episodeInformationList = (`
      Season ${episode.season}-Episode ${episode.number}<ul>
        <li>Name: ${episode.name}</li>
        <li>Air Date: ${episode.airdate}</li>
        <li>${episode.summary}</li>
        <li>Run Time (min): ${episode.runtime}</li>
        <li>Source: ${episode.url}</li>
      </ul>
    `);
    $episodeInformationParent.append($episodeInformationList);
    
  }

  $episodesInformationContainer.show();

}