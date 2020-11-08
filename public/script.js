// List of restraunts requested from server, for populating list later
let list;

// Get restraunts from server
fetch('/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
})
  .then((fromServer) => {
    return fromServer.json();
  })
  .then((data) => {
    list = data;
  })
  .catch((err) => {
    console.log(err)
  });

// Filter restraunts by search query
function updateList() {
    console.log('updateList');

    const listEle = document.getElementsByClassName('results')[0];

    for (let i = 0; i < 10; i++) {
      const entry = list[i];

      console.log(entry);

      // Insert entry at end of list
      const entryEle = document.createElement('li');
      listEle.insertAdjacentElement('beforeend', entryEle);

      // Create element for name of restraunt
      const entryHeader = document.createElement('h2');
      entryHeader.innerText = entry.name;
      entryEle.insertAdjacentElement('beforeend', entryHeader);

      // let entryHeader = document.createElement('p');
      // let entryHeader = document.createElement('p');
      // let entryHeader = document.createElement('p');
      // let entryHeader = document.createElement('p');
    }
}

// Create an event listener, update list when search input text changes
document.getElementsByTagName('input')[0].addEventListener('change', updateList);
