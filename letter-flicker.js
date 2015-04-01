var letterFlicker = (function(config) {
    'use strict';

    /***************************************************
     * Private functions and variables
     **************************************************/

    /**
     * Letters a-z of the alphabet in an array.
     */
    var alpha = range('a'.charCodeAt(0), 'z'.charCodeAt(0)).map(function(char) {
        return String.fromCharCode(char);
    });

    /**
     * Generates random string from alpha array with length defined by `n`.
     */
    function randomString(n) {
        var randString = [];
        for(var i = 0; i < n; i++) {
            randString.push(alpha[Math.floor(Math.random() * alpha.length)]);
        }

        return randString.join('');
    };

    // Does what it says
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    /**
     * Returns array of numbers between from and to.
     *
     * range(1, 3); // [1, 2, 3]
     */
    function range(from, to) {
        if(from == to) {
            return [];
        } else if(from > to) {
            throw new Error('`from` cannot be greater than `to`');
        }

        return Array.apply(null, Array(to - from + 1)).map(function(_, i) {
            return from + i;
        });
    };

    /**
     * The loop function is used to mutate the DOM for each frame in the iteration.
     *
     * It is bound to the iteration object.
     */
    function loop() {
        this.frames --;

        if(this.nextIsLess) {
            this.element.textContent = randomString(getRandomInt(this.nextWord.length, this.currentWord.length));
        } else {
            this.element.textContent = randomString(getRandomInt(this.currentWord.length, this.nextWord.length));
        }

        if(this.frames > 0) {
            this.animationFrame = requestAnimationFrame(loop.bind(this));
        } else {
            cancelAnimationFrame(this.animationFrame);
            this.element.textContent = this.nextWord;
            this.cb();
        }
    };

    /***************************************************
     * Public functions and variables from here on down
     **************************************************/

    // Element we're mutating
    this.element = config.element;

    // Word pool
    this.words = config.words;
    this.words.push(this.element.textContent);

    // Current word should always refer to the word that was in the DOM prior
    // to mutation. By default we're taking the value of the element we're
    // mutating
    this.currentWord = this.element.textContent;

    // Grace period between mutations defined in ms
    this.rest = config.rest || 2000;

    /**
     * Returns a random word from the word pool.
     */
    this.pickNextWord = function() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    };

    /**
     * An 'iteration' is defined as the transition between the current word and
     * the next word.
     *
     * `frames` refers to the amount of steps in that transition.
     *
     * Iterations are bound to the loop function which mutates the DOM for the
     * number of frames specified.
     */
    this.generateIteration = function(cb) {
        var iteration = {
            nextWord : this.pickNextWord(),
            currentWord: this.currentWord,
            element: this.element,
            cb: cb,
            frames: 60
        };
        iteration.nextIsLess = iteration.nextWord.length < iteration.currentWord.length;

        // Kick off loop
        requestAnimationFrame(loop.bind(iteration));
    };

    /**
     * Kickstart the flicker effect with this handy init function!
     *
     * This function does two things:
     *
     *      1. Generates an iteration
     *      2. Calls itself again in a callback after a grace period to create
     *      an infinite loop.
     */
    this.init = function init() {
        this.generateIteration(function() {
            this.currentWord = this.element.textContent;
            setTimeout(function() {
                this.init();
            }.bind(this), this.rest);
        }.bind(this));
    };
});
