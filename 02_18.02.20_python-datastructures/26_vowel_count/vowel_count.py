def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    phrase = phrase.lower();
    phraseSet = set(phrase);
    phraseVowelSet = {character for character in phraseSet if (character == 'a' or character == 'e' or character == 'i' or character == 'o' or character == 'u')};

    phraseVowelDictCount = {character: 0 for character in phraseVowelSet};
    
    for character in phrase:
        if (character == 'a' or character == 'e' or character == 'i' or character == 'o' or character == 'u'):
            phraseVowelDictCount[character] = phraseVowelDictCount[character] + 1;

    return phraseVowelDictCount;