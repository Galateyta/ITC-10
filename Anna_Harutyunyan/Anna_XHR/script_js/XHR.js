function ITC(url) {
    return new Promise(function(succeed, fail) {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.addEventListener('load', function() {
            if (request.status < 400) {
                succeed(request.response);
            }
            else {
                fail(new Error('Request failed: ' + request.statusText));
            }
        });
        request.addEventListener('error', function() {
            fail(new Error('Error'));
        });
        request.send();
    });
}
ITC('https://httpbin.org/get').then
(succeed => console.log(succeed), fail => console.log(fail)); 

















