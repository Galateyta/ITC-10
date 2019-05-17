function ITC(url) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onload = function () {
            if (request.status === 200)
                resolve(request.response);
            else
                reject(request.statusText);
        };
        request.send();
    });
}
ITC('https://jsonplaceholder.typicode.com/todos/1').then(alert, alert); 