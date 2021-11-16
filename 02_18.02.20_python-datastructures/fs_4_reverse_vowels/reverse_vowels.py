def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowelIndices = []; # index positions of all vowels.
    
    for index in range(len(s)):
        testChar = s[index].lower();
        if testChar == 'a' or testChar == 'e' or testChar == 'o' or testChar == 'i' or testChar == 'u':
            vowelIndices.append(index);
    
    while vowelIndices:
        vowelIndexOne = vowelIndices.pop(0);
        vowelOne = s[vowelIndexOne];
        if len(vowelIndices) != 0:
            # vowelIndices was even length OR there is still exchanges that need to happen
            conjugateVowelIndex = vowelIndices.pop();
            s = s[0:vowelIndexOne]+s[conjugateVowelIndex]+s[vowelIndexOne+1:conjugateVowelIndex]+vowelOne+s[conjugateVowelIndex+1:];
        
    return s;