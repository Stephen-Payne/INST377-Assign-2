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

/**
 * Gets x random elements from the list.
 */
function getRandomElements(x, list) {
  let randomElements = [];
  let indicesUsed = new Map();
  for (let i = 0; i < x; i++) {
    let randIdx = Math.floor(Math.random() * list.length);
    while (indicesUsed.has(randIdx)) {
      randIdx = Math.floor(Math.random() * list.length);
    }
    indicesUsed.set(randIdx, true);
    randomElements.push(list[randIdx]);
  }
  return randomElements;
}

/**
 * Returns a filtered and randomized list. Will decide to filter
 * list by either zipcode or category depending on if the query is
 * a number or characters. Then returns a list of at most 10 random
 * elements from that list.
 */
function filterAndRandomizeList() {
    const searchEle = document.getElementsByTagName('input')[0];
    const query = searchEle.value;

    // Filter list by category or zip code
    let filteredList = [];
    if (!isNaN(query))
      filteredList = list.filter(ele => ele.zip.includes(query));
    else
      filteredList = list.filter(ele => ele.category.includes(query));

    // Return x random elements from the filtered list
    let numEntries = 10;
    if (filteredList.length < 10) numEntries = filteredList.length;
    return getRandomElements(numEntries, filteredList);
}

// Filter restraunts by search query
function updateList() {
    console.log('updateList');

    // Filter list by query, and select at most 10 random entries
    let filteredList = filterAndRandomizeList();
    const listEle = document.getElementsByClassName('results')[0];

    // Reset list before populating
    listEle.innerHTML = '';

    // Add each entry to the page
    for (let i = 0; i < filteredList.length; i++) {
      const entry = filteredList[i];

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
      const entryAddress = document.createElement('address');
      entryAddress.innerHTML = `${entry.address_line_1}<br> ${entry.city}<br> ${entry.zip}`
      entryEle.insertAdjacentElement('beforeend', entryAddress);
    }
}

// Create an event listener, update list when search input text changes
document.getElementsByTagName('input')[0].addEventListener('input', updateList);
