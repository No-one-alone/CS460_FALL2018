﻿/* This is our javascript file for the AJAX calls to the Giphy API. */

// This is our massive list of common verbs and adjectives that are to be excluded from being matched to possible images.
var excludedWords = [",", ".", "", "/", ";", "a", "an", "the", "i", "me", "we", "to", "for", "going",
    "of", "to", "you", "be", "is", "he", "she", "them", "this", "other", "not", "in", "toward", "and", "so", "but", "yet",
    "before", "as", "since", "when", "while", "until", "after", "later", "next", "all", "or", "thus", "my", "our", "on",
    "about", "above", "among", "at", "before", "in", "of", "with", "into", "by", "over", "beyond", "plus", "out", "down", "off", "near", "at",
    "next", "past", "future", "regardless", "upon", "via", "with", "also", "without", "through", "except", "inside", "outside", "per", "until", "upon",
    "having", "was", "being", "been", "someone", "take", "aback", "abaft", "abandoned", "abashed", "aberrant", "abhorrent", "abiding", "abject", "ablaze",
    "able", "abnormal", "aboard", "aboriginal", "abortive", "abounding", "abrasive", "abrupt", "absent", "absorbed", "absorbing", "abstracted",
    "absurd", "abundant", "abusive", "acceptable", "accessible", "accidental", "accurate", "acid", "acidic", "acoustic", "acrid", "actually",
    "ad", "hoc", "adamant", "adaptable", "addicted", "adhesive", "adjoining", "adorable", "adventurous", "afraid", "aggressive", "agonizing",
    "agreeable", "ahead", "ajar", "alcoholic", "alert", "alike", "alive", "alleged", "alluring", "aloof", "amazing", "ambiguous", "ambitious",
    "amuck", "amused", "amusing", "ancient", "angry", "animated", "annoyed", "annoying", "anxious", "apathetic", "aquatic", "aromatic", "arrogant",
    "ashamed", "aspiring", "assorted", "astonishing", "attractive", "auspicious", "automatic", "available", "average", "awake", "aware", "awesome",
    "awful", "axiomatic", "bad", "barbarous", "bashful", "bawdy", "beautiful", "befitting", "belligerent", "beneficial", "bent", "berserk", "best",
    "better", "bewildered", "big", "billowy", "bite-sized", "bitter", "bizarre", "black", "black-and-white", "bloody", "blue", "blue-eyed", "blushing",
    "boiling", "boorish", "bored", "boring", "bouncy", "boundless", "brain", "yed", "blushing", "boiling", "boorish", "bored", "boring", "bouncy", "boundless",
    "brainy", "brash", "brave", "brawny", "breakable", "breezy", "brief", "bright", "bright", "broad", "broken", "brown", "bumpy", "burly", "bustling",
    "busy", "cagey", "calculating", "callous", "calm", "capable", "capricious", "careful", "careless", "caring", "cautious", "ceaseless", "certain",
    "changeable", "charming", "cheap", "cheerful", "chemical", "chief", "childlike", "chilly", "chivalrous", "chubby", "chunky", "clammy", "classy",
    "clean", "clear", "clever", "cloistered", "cloudy", "closed", "clumsy", "cluttered", "coherent", "cold", "colorful", "colossal", "combative",
    "comfortable", "common", "complete", "complex", "concerned", "condemned", "confused", "conscious", "cooing", "cool", "cooperative", "coordinated",
    "courageous", "cowardly", "crabby", "craven", "crazy", "creepy", "crooked", "crowded", "cruel", "cuddly", "cultured", "cumbersome", "curious",
    "curly", "curved", "curvy", "cut", "cute", "cute", "cynical", "daffy", "daily", "damaged", "damaging", "damp", "dangerous", "dapper", "dark", "dashing",
    "dazzling", "dead", "deadpan", "deafening", "dear", "debonair", "decisive", "decorous", "deep", "deeply", "defeated", "defective", "defiant", "delicate",
    "delicious", "delightful", "demonic", "delirious", "dependent", "depressed", "deranged", "descriptive", "deserted", "detailed", "determined", "devilish",
    "didactic", "different", "difficult", "diligent", "direful", "dirty", "disagreeable", "disastrous", "discreet", "disgusted", "disgusting", "disillusioned",
    "dispensable", "distinct", "disturbed", "divergent", "dizzy", "domineering", "doubtful", "drab", "draconian", "dramatic", "dreary", "drunk", "dry", "dull",
    "dusty", "dynamic", "dysfunctional", "eager", "early", "earsplitting", "earthy", "easy", "eatable", "economic", "educated", "efficacious", "efficient",
    "eight", "elastic", "elated", "elderly", "electric", "elegant", "elfin", "elite", "embarrassed", "eminent", "empty", "enchanted", "enchanting", "encouraging",
    "endurable", "energetic", "enormous", "entertaining", "enthusiastic", "envious", "equable", "equal", "erect", "erratic", "ethereal", "evanescent", "evasive",
    "even excellent excited", "exciting exclusive", "exotic", "expensive", "extra - large extra - small exuberant", "exultant", "fabulous", "faded", "faint fair",
    "faithful", "fallacious", "false familiar famous", "fanatical", "fancy", "fantastic", "far", " far - flung", " fascinated", "fast", "fat faulty", "fearful fearless",
    "feeble feigned", "female fertile", "festive", "few fierce", "filthy", "fine", "finicky", "first", " five", " fixed", " flagrant", "flaky", "flashy", "flat",
    "flawless", "flimsy", " flippant", "flowery", "fluffy", "fluttering", " foamy", "foolish", "foregoing", "forgetful", "fortunate", "four frail", "fragile",
    "frantic", "free", " freezing", " frequent", " fresh", " fretful", "friendly", "frightened frightening full fumbling functional", "funny", "furry furtive",
    "future futuristic", "fuzzy ", "gabby", "gainful", "gamy", "gaping", "garrulous", "gaudy", "general gentle", "giant", "giddy", "gifted", "gigantic",
    "glamorous", "gleaming", "glib", "glistening glorious", "glossy", "godly", "good", "goofy", "gorgeous", "graceful", "grandiose", "grateful gratis",
    "gray greasy great", "greedy", "green grey grieving", "groovy", "grotesque", "grouchy", "grubby gruesome", "grumpy", "guarded", "guiltless", "gullible gusty",
    "guttural H habitual", "half", "hallowed", "halting", "handsome", "handsomely", "handy", "hanging", "hapless", "happy", "hard", "hard - to - find",
    "harmonious", "harsh", "hateful", "heady", "healthy", "heartbreaking", "heavenly heavy hellish", "helpful", "helpless", "hesitant", "hideous high",
    "highfalutin", "high - pitched", "hilarious", "hissing", "historical", "holistic", "hollow", "homeless", "homely", "honorable", "horrible", "hospitable",
    "hot huge", "hulking", "humdrum", "humorous", "hungry", "hurried", "hurt", "hushed", "husky", "hypnotic", "hysterical", "icky", "icy", "idiotic",
    "ignorant", "ill", "illegal", "ill - fated", "ill - informed", "illustrious", "imaginary", "immense", "imminent", "impartial", "imperfect", "impolite",
    "important", "imported", "impossible", "incandescent", "incompetent", "inconclusive", "industrious", "incredible", "inexpensive", "infamous", "innate",
    "innocent", "inquisitive", "insidious", "instinctive", "intelligent", "interesting", "internal", "invincible", "irate", "irritating", "itchy", "jaded",
    "jagged", "jazzy", "jealous", "jittery", "jobless", "jolly", "joyous", "judicious", "juicy", "jumbled", "jumpy", "juvenile", "kaput", "keen", "kind",
    "kindhearted", "kindly", "knotty", "knowing", "knowledgeable", "known", "labored", "lackadaisical", "lacking", "lame", "lamentable", "languid", "large",
    "last", "late", "laughable", "lavish", "lazy", "lean", "learned", "left", "legal", "lethal", "level", "lewd", "light", "like", "likeable", "limping",
    "literate", "little", "lively", "lively", "living", "lonely", "long", "longing", "term", "loose", "lopsided", "loud", "loutish", "lovely", "loving", "low", "lowly",
    "lucky", "ludicrous", "lumpy", "lush", "luxuriant", "lying", "lyrical", "macabre", "macho", "maddening", "madly", "magenta", "magical", "magnificent",
    "majestic", "makeshift", "male", "malicious", "mammoth", "maniacal", "many", "marked", "massive", "married", "marvelous", "material", "materialistic",
    "mature", "mean", "measly", "meaty", "medical", "meek", "mellow", "melodic", "melted", "merciful", "mere", "messy", "mighty", "military", "milky",
    "mindless", "miniature", "minor", "miscreant", "misty", "mixed", "moaning", "modern", "moldy", "momentous", "motionless", "mountainous", "muddled",
    "mundane", "murky", "mushy", "mute", "mysterious", "naive", "nappy", "narrow", "nasty", "natural", "naughty", "nauseating", "near", "neat", "nebulous",
    "necessary", "needless", "needy", "neighborly", "nervous", "new ", "next", "nice", "nifty", "nimble", "nine", "nippy", "noiseless", "noisy", "nonchalant",
    "nondescript", "nonstop", "normal", "nostalgic", "nosy", "noxious", "null", "numberless", "numerous", "nutritious", "nutty", "oafish", "obedient", "obeisant",
    "obese", "obnoxious", "obscene", "obsequious", "observant", "obsolete", "obtainable", "oceanic", "odd", "offbeat", "old", "old - fashioned", "omniscient",
    "one", "onerous", "open", "opposite", "optimal", "orange", "ordinary", "organic", "ossified", "outgoing", "outrageous", "outstanding", "oval", "overconfident",
    "overjoyed", "overrated", "overt", "overwrought", "painful", "painstaking", "pale", "paltry", "panicky", "panoramic", "parallel", "parched", "parsimonious",
    "past", "pastoral", "pathetic", "peaceful", "penitent", "perfect", "periodic", "permissible", "perpetual", "petite", "petite", "phobic", "physical", "picayune",
    "pink", "piquant", "placid", "plain", "plant", "plastic", "plausible", "pleasant", "plucky", "pointless", "poised", "polite", "political", "poor", "possessive",
    "possible", "powerful", "precious", "premium", "present", "pretty", "previous", "pricey", "prickly", "private", "probable", "productive", "profuse",
    "protective", "proud", "psychedelic", "psychotic", "public", "puffy", "pumped", "puny", "purple", "purring", "pushy", "puzzled", "puzzling", "quack", "quaint",
    "quarrelsome", "questionable", "quick", "quickest", "quiet", "quirky", "quixotic", "quizzical", "rabid", "racial", "ragged", "rainy", "rambunctious", "rampant",
    "rapid", "rare", "raspy", "ratty", "ready", "real", "rebel", "receptive", "recondite", "red", "redundant", "reflective", "regular", "relieved", "remarkable",
    "reminiscent", "repulsive", "resolute", "resonant", "responsible", "rhetorical", "rich", "right", "righteous", "rightful", "rigid", "ripe", "ritzy", "roasted",
    "robust", "romantic", "roomy", "rotten", "rough", "round", "royal", "ruddy", "rude", "rural", "rustic", "ruthless", "sable", "sad", "safe", "salty", "same",
    "sassy", "satisfying", "savory", "scandalous", "scarce", "scared", "scary", "scattered", "scientific", "scintillating", "scrawny", "screeching", "second",
    "second - hand", "secret", "secretive", "sedate", "seemly", "selective", "selfish", "separate", "serious", "shaggy", "shaky", "shallow", "sharp", "shiny",
    "shivering", "shocking", "short", "shrill", "shut", "shy", "sick", "silent", "silent", "silky", "silly", "simple", "simplistic", "sincere", "six", "skillful",
    "skinny", "sleepy", "slim", "slimy", "slippery", "sloppy", "slow", "small", "smart", "smelly", "smiling", "smoggy", "smooth", "sneaky", "snobbish", "snotty",
    "soft", "soggy", "solid", "somber", "sophisticated", "sordid", "sore", "sore", "sour", "sparkling", "special", "spectacular", "spicy", "spiffy", "spiky",
    "spiritual", "spiteful", "splendid", "spooky", "spotless", "spotted", "spotty", "spurious", "squalid", "square", "squealing", "squeamish", "staking", "stale",
    "standing", "statuesque", "steadfast", "steady", "steep", "stereotyped", "sticky", "stiff", "stimulating", "stingy", "stormy", "straight", "strange", "striped",
    "strong", "stupendous", "stupid", "sturdy", "subdued", "subsequent", "substantial", "successful", "succinct", "sudden", "sulky", "super", "superb",
    "superficial", "supreme", "swanky", "sweet", "sweltering", "swift", "symptomatic", "synonymous", "taboo", "tacit", "tacky", "talented", "tall", "tame",
    "tan", "tangible", "tangy", "tart", "tasteful", "tasteless", "tasty", "tawdry", "tearful", "tedious", "teeny", "teeny - tiny", "telling", "temporary",
    "ten", "tender tense", "tense", "tenuous", "terrible", "terrific", "tested", "testy", "thankful", "therapeutic", "thick", "thin", "thinkable", "third",
    "thirsty", "thoughtful", "thoughtless", "threatening", "three", "thundering", "tidy", "tight", "tightfisted", "tiny", "tired", "tiresome", "toothsome",
    "torpid", "tough", "towering", "tranquil", "trashy", "tremendous", "tricky", "trite", "troubled", "truculent", "true", "truthful", "two", "typical",
    "ubiquitous", "ugliest", "ugly", "ultra", "unable", "unaccountable", "unadvised", "unarmed", "unbecoming", "unbiased", "uncovered", "understood",
    "undesirable", "unequal", "unequaled", "uneven", "unhealthy", "uninterested", "unique", "unkempt", "unknown", "unnatural", "unruly", "unsightly", "unsuitable",
    "untidy", "unused", "unusual", "unwieldy", "unwritten", "upbeat", "uppity", "upset", "uptight", "used", "useful", "useless", "utopian", "utter", "uttermost",
    "vacuous", "vagabond", "vague", "valuable", "various", "vast", "vengeful", "venomous", "verdant", "versed", "victorious", "vigorous", "violent", "violet",
    "vivacious", "voiceless", "volatile", "voracious", "vulgar", "wacky", "waggish", "waiting", "", "wakeful", "wandering", "wanting", "warlike", "warm", "wary",
    "wasteful", "watery", "weak", "wealthy", "weary", "well - groomed", "well - made", "well - off", "well - to -do ", "wet", "whimsical", "whispering", "white",
    "whole", "wholesale", "wicked", "wide", "wide - eyed", "wiggly", "wild", "willing", "windy", "wiry", "wise", "wistful", "witty", "woebegone", "womanly",
    "wonderful", "wooden", "woozy", "workable", "worried", "worthless", "wrathful", "wretched", "wrong", "wry", "xenophobic", "yellow", "yielding", "young",
    "youthful", "yummy", "zany", "zealous", "zesty", "zippy", "zonked", "am", "have","with", "your","off", "what"];


// This sends the request to GIPHY Site.
// It takes our word that we may 
// want a GIF of, if it is "interesting.
function getGiphyImage(keyWord) {

    // this creates our url.
    var source = "Giphy/Image/" + keyWord;

    // This is the AJAX call itself.
    $.ajax({
        type: "GET",
        dataType: "json",
        url: source,
        success: showImage,
        error: ajaxErrorMessage
    });
}


// This function gives an error message to the user in the event that the image cannot be loaded.
function ajaxErrorMessage() {
    alert("Image cannot be loaded!!!");
}

// This function displays the GIF image to the client.
function showImage(dataOfImage) {

    // This is the uri of the GIF to be displayed.
    var gifImage = dataOfImage.data.images.fixed_height_small.url; 

    // This appends the GIF image to the HTML document via jQuery.
    $("#dynamic-output").append("<img src=\"" + gifImage + "\"/> &nbsp;");
}

// This is the main function for our javascript i.e. our program entry point.
function main() {
    $("#textbox").keypress(function (k) {
        if (k.keyCode == 32) { // Checks if space has been entered into input textbox.
            var text = document.getElementById("textbox").value; // this retrieves the text from the input textbox.
            text = text.split(" "); // This splits the text into an array of words.
            lastWord = text[text.length - 1]; // this retrieves the last word of the array.
            var lowerWord = lastWord.toLowerCase(); // this converts the word to all lowercase in order to compare against the words in our above list.

            // This will check if the word is in our list of excluded words.
            if (excludedWords.includes(lowerWord)) { 
                $("#dynamic-output").append("<label>" + lastWord + "</label>&nbsp;") // this will simply display the entered word as output.
            }
            else { 
                getGiphyImage(lastWord); // this will display the GIF image translation for the word if it is not in the above array.
            }
        }
    });
}

// This accesses the document and triggers the main function to get things started.
$(document).ready(main); 