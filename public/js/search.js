const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
  const res = await fetch('../data/searchPosters.json');
  const states = await res.json();

  let matches = states.filter(state => {
    const regex = new RegExp(`${searchText}`, 'gi');

    return state.title.match(regex); //  || state.nameF.match(regex)
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  console.log(matches);
  outputHtml(matches);
};
const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        <div class="matchTitle"> 
        <h4><a href="/movies/${match._id
            .toLowerCase()
            .split(' ')
            .join('-')}"><img id="imgSearch" src=${match.idPoster
          }></img></a><a id="titleSearch" href="/movies/${match._id
            .toLowerCase()
            .split(' ')
            .join('-')}">${match.title}<a/></h4>
        <small></small>
        </div>
        `
      )
      .join('');
    matchList.innerHTML = html;
  }
};
search.addEventListener('input', () => searchStates(search.value));
