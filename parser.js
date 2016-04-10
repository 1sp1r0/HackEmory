var pos = require('pos');

module.exports = function(msg) {
    var words = new pos.Lexer().lex(msg);
    var tagger = new pos.Tagger();
    tagger.extendLexicon({'be': ['TO']})

    var taggedWords = tagger.tag(words);

    var nounTypes = new Set(['NN', 'NNS', 'NNP', 'NNPS']);
    var pronounTypes = new Set(['NNP', 'NNPS']);
    var verbTypes = new Set(['VB', 'VBG', 'VBN', 'VBP', 'VBZ']);

    var nouns = [];
    var verbs = [];
    var pronouns = [];

    var indicators = new Set(['should', 'lets', 'let\'s']);

    var indic1 = new Set(['VB', 'VBG', 'VBP', 'VBZ']);
    var indic2 = new Set(['TO']);

    var titles = [];

    for (var i = 0; i < taggedWords.length - 1; i++) {

        var nameStr = "";
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];

        var taggedWordN = taggedWords[i+1];
        var wordN = taggedWordN[0];
        var tagN = taggedWordN[1];

        if (indic1.has(tag) && indic2.has(tagN) ||
                indic1.has(tagN) && indic2.has(tag) ||
                indicators.has(word) && indic1.has(tagN)) {
            console.log("testset");
            if (!(indicators.has(tag) && indic1.has(tagN))) {
                nameStr += word + " " + wordN + " ";
            }
            var nextNounUnfound = 1;
            for (var j = i+2; nextNounUnfound && j < taggedWords.length; j++) {
                nameStr += (taggedWords[j])[0] + " ";
                if (j > i + 2) {
                    nextNounUnfound = nounTypes.has((taggedWords[j])[1]) ? 0 : 1;
                }
            }
        }

        if (nameStr) {
            titles.push(trimIndic(nameStr, indicators));
        }
        console.log("INFOb:", nameStr);
    }
    console.log("ASDF:", titles[titles.length-1]);
    return titles.pop();
}


function trimIndic(title, indicators) {
    var spaceInd = title.indexOf(" ");
    while (title.substring(0, spaceInd) === "to" ||
           title.substring(0, spaceInd) === "be" ||
           indicators.has(title.substring(0, spaceInd))) {
        title = title.substring(spaceInd+1);
        spaceInd = title.indexOf(" ");
    }

    return title;
}
           /*     verbs.push(taggedWord);
                nameStr += word + " ";
                var nextNounUnfound = 1;
                for (var j = i+1; nextNounUnfound && j < taggedWords.length; j++) {
                    nameStr += taggedWords[j][0] + " ";
                    nextNounUnfound = nounTypes.has(taggedWords[j][1]) ? 0 : 1;
                }
                if (pronounTypes.has(tag)) {
                    pronouns.push(word);
                }
    }
        console.log("INFO:", pronouns);
        console.log("INFO:", verbs); */
