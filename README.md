
The goal of this exercise is to create a three level deep "master-detail" application.

You'll use the data from the Game of Thrones API at this URL: `https://anapioficeandfire.com/api/`

This API has a lot of information about the Game of Thrones books and tv show.

You'll build an application to browse through and display this information.

# Setup

Create your project repo, html, js, and css files.

In your HTML, create containers for:

- category
- masterlist
- detail

Note the term "masterlist" is being used to differentiate it from the term "unordered list", which is an HTML element.

# Level 1: Category menu

If you send a request to `https://anapioficeandfire.com/api/`, it will return the following object: 

```js
{
    "books":"https://anapioficeandfire.com/api/books",
    "characters":"https://anapioficeandfire.com/api/characters",
    "houses":"https://anapioficeandfire.com/api/houses"
}
```

Here are some things you'll need to do:

- Create a variable that refers to your `category` container.
- Send a `fetch()` request to the API to get the JSON object shown above.
- Use the keys from that object and turn them into list items.
- Add the list items to the `category` container.


## Level 2: masterlist items per category

You'll notice that the values in the object you retrieved are all URLs.

You want to let the user click one of the list items in the `category` container to access the information at those URLs.

To make that happen, you will need to:

- Add Event Listeners to each list item in the `category` container
    - (Consider adding this as a step before you add the masterlist items to the DOM.)
- The Event Listener should send a `fetch()` request to the correct URL. (If they clicked "books", send the `fetch()` request to `"https://anapioficeandfire.com/api/books?page"`)
- When the array of results come back, create list items for each of them.
- Clear out the `masterlist` container.
- `.appendChild()` each masterlist item to the `masterlist` container

## Level 3: Detail information

The last step is to make each item in the `masterlist` clickable so that it retrieves the information from the server and displays it in the `detail` container.

As you did with Level 2, each item in the master list needs an Event Listener added to it.

The Event Listener function should make a `fetch()` request associated with the masterlist item they clicked.

When the results come back, format it as DOM elements and append it to the `detail` container.

## Bonus: pagination

The API only returns 10 results at a time.

You can get more results by specifying a `"page"` parameter as part of the URL.

The first page of results is returned by default.

It is also accessible by specifying `"page=1"` parameter in the URL:
`"https://anapioficeandfire.com/api/books?page=1"`

Likewise, you can access the 2nd page at the URL: `"https://anapioficeandfire.com/api/books?page=1"`

