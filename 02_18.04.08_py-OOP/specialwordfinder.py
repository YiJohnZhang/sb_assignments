from wordfinder import WordFinder;

class SpecialWordFinder(WordFinder):
    '''
    >>> swf = SpecialWordFinder('words.txt');
    235886 word(s) read

    >>> (swf.random()) in swf.dictionaryList
    True
    '''

    def __init__(self, dictionaryFilePath):
        super().__init__(dictionaryFilePath);
    
    def readFile(self):
        
        fileObject = open(self.dictionaryFilePath);

        for word in fileObject:
            word = word.rstrip('\n');
            if not(word[:2] == '# ' or word == ''):
                self.dictionaryList.append(word);
        
        self.dictionarySize = len(self.dictionaryList);
        print(f'{self.dictionarySize} word(s) read');
