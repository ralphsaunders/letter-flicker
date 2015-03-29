# letter-flicker
I needed to flicker letters in a glitchy-type fashion for a project of mine -
so I wrote a module!

See it in action [on gh-pages](http://ralphsaunders.github.io/letter-flicker/).

## Quickstart

    <script src="path/to/letter-flicker.js"></script>

    <script>
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
    </script>

## Browser support

Requires ES5 support.
