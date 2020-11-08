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

      // Insert entry at end of list
      const entryEle = document.createElement('li');
      listEle.insertAdjacentElement('beforeend', entryEle);

      // Create element for name of restraunt
      const entryHeader = document.createElement('h2');
      entryHeader.innerText = entry.name;
      entryEle.insertAdjacentElement('beforeend', entryHeader);

      // Create element for category
      const entryCategory = document.createElement('p');
      entryCategory.innerText = entry.category;
      entryEle.insertAdjacentElement('beforeend', entryCategory);

      // Create element for address
      const entryAddress = document.createElement('p');
      entryAddress.innerText = entry.address_line_1;
      entryEle.insertAdjacentElement('beforeend', entryAddress);

      // Create element for city
      const entryCity = document.createElement('p');
      entryCity.innerText = entry.city;
      entryEle.insertAdjacentElement('beforeend', entryCity);

      // Create element for zipcode
      const entryZip = document.createElement('p');
      entryZip.innerText = entry.zip;
      entryEle.insertAdjacentElement('beforeend', entryZip);
    }
}

// Create an event listener, update list when search input text changes
document.getElementsByTagName('input')[0].addEventListener('change', updateList);
