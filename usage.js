var flickIt = new letterFlicker({
    element: document.querySelector('.flicker'),
    words: [
        'objects',
        'circuits',
        'tape',
        'paper',
        'hammers'
    ],
    rest: 5000
});

setTimeout(function() {
    flickIt.init();
}, 5000);
