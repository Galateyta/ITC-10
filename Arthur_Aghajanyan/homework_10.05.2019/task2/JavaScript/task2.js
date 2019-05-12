function start(){

    function cutString(string) {
        while (string.indexOf('G',0) != -1) {

            var indexG = string.indexOf('G', 0);

            let indexg = string.lastIndexOf('g', indexG);

            let revertg_G = string.slice(indexg + 1, indexG).split('').reverse().join('');

            var string = string.slice(0, indexg) + revertg_G + string.slice(indexG + 1);

        }
        return string;
    }
    const string='aag21g78GGg32G7';

    const cutStringRevert = cutString(string);

    document.getElementById('string').innerHTML = 'String - ' + string;
    document.getElementById('cutString').innerHTML = 'After Cut and Revert - ' + cutStringRevert;

}
