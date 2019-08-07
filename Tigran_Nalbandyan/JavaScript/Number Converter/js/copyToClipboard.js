function copyToClipboard(id) {
    const copyText = document.getElementById(`result-${id}`).textContent;

    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = copyText;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    alert(`Copied the text: ${copyText}`);
}