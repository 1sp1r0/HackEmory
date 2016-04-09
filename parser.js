var pos = require('pos');

module.exports = function(msg) {
        var words = new pos.Lexer().lex(msg);
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);

        var pronouns = [];
        var verbs    = [];
        for (i in taggedWords) {
            var taggedWord = taggedWords[i];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            pronouns.push(taggedWord);
        }

        // extend the lexicon
        //tagger.extendLexicon({'Obama': ['NNP']});
        //tagger.tag(['Mr', 'Obama']);
        // --> [[ 'Mr', 'NNP' ], [ 'Obama', 'NNP' ]]
        //  ] ]]
    }
