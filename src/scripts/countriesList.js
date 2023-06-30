const listContainer = document.querySelector('#selected-countries-list-container');

// eslint-disable-next-line import/prefer-default-export
export const displayCountries = (countries) => {
  const ul = document.createElement('ul');

  for (let i = 0; i < countries.length; i += 1) {
    const li = document.createElement('li');
    li.innerText = countries[i];
    ul.appendChild(li);
  }

  listContainer.replaceChildren(ul);
};
