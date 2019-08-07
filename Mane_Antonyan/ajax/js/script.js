'use strict';

function ITC(url) {
    let xhttp = new XMLHttpRequest();
    
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("result"), 1000);
        setTimeout(() => reject(new Error("ignored")), 2000);
    });

    promise.then (
        result => document.getElementById('response').innerHTML = xhttp.responseText
    ).catch(
        error => document.getElementById('response').innerHTML = error.status + error.statusText
    )

    xhttp.open("GET", url, true);
    xhttp.send();
}

function tempFunction() {
    let url1 = 'http://localhost:3000';
    //let url = 'github.com/user/repo/master/db.json';
    //let url2 = 'my-json-server.typicode.com/user/repo/posts/1'
    ITC(url1);
    // ITC(url);
    // ITC(url2);
}