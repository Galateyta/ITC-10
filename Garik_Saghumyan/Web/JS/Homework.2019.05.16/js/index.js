function ITC(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onload = function () {
            if (request.status < 400)
                resolve(request.response);
            else
                reject(new Error("Request failed: " + request.statusText));
        };
        request.onerror = function () {
            reject(new Error("Network error"));
        };
        request.send();
    });
}
ITC('https://jsonplaceholder.typicode.com/todos/1').then(response => alert(response), error => alert(error));