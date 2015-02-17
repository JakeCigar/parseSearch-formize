formize
=======
A jQuery plugin. The opposite of .serialize. It takes a query string and loads it into a <form>.

Usage
```JavaScript
    $("form").formize(); // uses location.search 
    
    $("form").formize(parseSearchResult);
```
parseSearch
===========
Usage
```JavaScript
    var formObject= parseSearch() // uses location.search
    
    var formObject= parseSearch(aQueryString)
```

extra examples
--------------
```JavaScript
/* make an 'JSON' object to send using AJAX */
var json = parseSearch($("form").serialize())
```
