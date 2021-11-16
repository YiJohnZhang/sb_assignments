"""Word Finder: finds random words from a dictionary."""
from random import randint;

class WordFinder:

    def __init__(self, dictionaryFilePath):
        self.dictionaryFilePath = dictionaryFilePath;
        self.dictionaryList = [];
        self.dictionarySize = 0;
        self.readFile();

    def readFile(self):

        fileObject = open(self.dictionaryFilePath);
        
        for word in fileObject:
            word = word.rstrip('\n');
            self.dictionaryList.append(word);
        
        self.dictionarySize = len(self.dictionaryList);
        print(f'{self.dictionarySize} words read');

    def random(self):
        return self.dictionaryList[randint(0,self.dictionarySize)];
