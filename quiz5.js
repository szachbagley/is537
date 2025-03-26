#!/usr/bin/env node
/*
reading the file with fs.readFileSync is a step that likely takes O(N) 
time, where N is the number of characters in the file. The next step is
the replace method, which also takes O(N) time, where N is the number of
characters in the file. The split method takes O(N) time as well, as it
iterates through all of the text to find white spaces. 
the for loop that follows takes O(N) time, where N is the number of words
in the text. This N value will always be less than (or, in the worst cases,
equal to) the number of characters in the file. The last for loop
takes O(N) time, where N is the number of unique words in the text, which
likewise will always be less than or equal to the number of characters in the text.
All these steps together create a time complexity of O(5N), and the contant 5
can be dropped.
Therefore, the time complexity of this function is O(N), where N is the number
of characters in the file.
*/
const fs = require("fs");
let file = fs.readFileSync("./FirstNephiChapter8.txt", "utf8");

function uniqueWords(text) {
  let wordsMap = {};
  let words = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\d]/g, "").split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    let word = words[i].toLowerCase();
    if (wordsMap[word]) {
      wordsMap[word]++;
    } else {
      wordsMap[word] = 1;
    }
  }

  for (let word in wordsMap) {
    console.log(word + " " + wordsMap[word]);
  }
}

uniqueWords(file);
