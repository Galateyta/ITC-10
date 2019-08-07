function ITC(url) {
    return new Promise(function(resolve, reject) {
        const myRequest = new XMLHttpRequest();
        myRequest.open('GET', url, true);
        myRequest.onload = function() {
            if (this.status == 200) {
              resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        myRequest.send();
    });

}

ITC('https://jsonplaceholder.typicode.com/todos/6').then(
    response => alert(`Fulfilled: ${response}`),
    error => alert(`Rejected: ${error}`)
  );