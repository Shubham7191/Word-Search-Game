

var playGame = new PlayGame();

function PlayGame() {
    this.updateLetterBoard = updateLetterBoard;
    this.addWordsToLetterBoard = addWordsToLetterBoard;

    var Animals = ["cat", "dog", "tiger", "monkey", "zebra"];
    var Fruits = ["apple", "mango", "banana", "strawberry", "cherry"];
    var Courses = ["java", "html", "python", "c", "c++"];

   function updateLetterBoard() {
    var selectedCategory = document.getElementById('Category1').value.toLowerCase(); // Convert to lowercase

    var letterBoard = document.getElementById("LetterBoard");
    letterBoard.innerHTML = "";

    var tableOfAlphabet = document.getElementById("tableOfAlphabet");
    tableOfAlphabet.innerHTML = "";

    switch (selectedCategory) {
        case "animal": // Corrected case
            addWordsToLetterBoard(Animals);
            break;
        case "fruits": // Corrected case
            addWordsToLetterBoard(Fruits);
            break;
        case "courses":
            addWordsToLetterBoard(Courses);
            break;
        default:
            break;
    }
}


    function addWordsToLetterBoard(words) {
        var letterBoard = document.getElementById("LetterBoard");
        var ul = document.createElement("ul");
        ul.setAttribute("id", "ulLetterBoardId");

        var sizeOfEachCategory = 0;

        words.forEach(function(word) {
            sizeOfEachCategory = word.length + sizeOfEachCategory;
            console.log(sizeOfEachCategory);
            console.log(word);
            var li = document.createElement("li");
            li.classList.add("liLetterBoard");
            li.textContent = word;
            ul.appendChild(li);
        });

        letterBoard.appendChild(ul);
        var tableOfAlphabet = document.getElementById("tableOfAlphabet");

        for (let i = 1; i <= 12; i++) {
            var row = document.createElement("tr");
            for (let j = 1; j <= 12; j++) {
                var col = document.createElement("td");
                col.classList.add("matrixTableData");
               
				col.dataset.row=i;
				col.dataset.column=j;
                row.appendChild(col);
            }
            tableOfAlphabet.appendChild(row);
        }
        placeCorrectLetter(words);
    }








    function placeCorrectLetter(words) {
    var positions = ["row", "column", "diagonal"];
	var nextLetter = 0;
	var newStart = 0;
    for (var i = 0; i < words.length; i++) 
	{
			nextLetter=1;
        var orientations = positions[Math.floor(Math.random() * positions.length)];
        var start = Math.floor(Math.random() * $(".matrixTableData").length); // kotun pan start hoil randomaly as per td class length

        var element = $(".matrixTableData").eq(start); 
        var myrow = element.data("row"); 
        var mycol = element.data("column");

     console.log(words[i] + " " + orientations + " :" + start + " " + myrow + " " + mycol);
	
	var newColumn; 

if (orientations == "row") 
{
	nextLetter= 12;

    if ((mycol * 1) + words[i].length <= 12) {
        newStart = start;
        console.log("There is space in row  :" + words[i] + " :" + start + " " + mycol);
    } else {
        console.log("There is no space in row :" + words[i] + " :" + start + " " + mycol);
        newColumn = 12 - words[i].length;
        newStart = $(".matrixTableData[data-row=" + myrow + "][data-column=" + newColumn + "]").index();
        console.log("There is no space in row :" + words[i] + " :" + start + " " + mycol + " " + newStart);
    }

}

else if (orientations == "column") 
{

    if ((myrow * 1) + words[i].length <= 12) 
	{
        newStart = start;
        console.log("There is space in column  :" + words[i] + " :" + start + " " + myrow);

    } 
	else {
        var newRow = 12 - words[i].length;
        console.log("There is no space in column :" + words[i] + " :" + start + " " + myrow);
        newStart = $(".matrixTableData[data-row=" + newRow + "][data-column=" + mycol + "]").index();
        console.log("There is no space in column :" + words[i] + " :" + start + " " + myrow + " " + newStart);

    }
}


var characters = words[i].split("");
var nextPosition = 0 ;
$.each(characters , function(key , item){
console.log(item);
$(".matrixTableData:eq(" + (newStart + nextPosition)+")").html(item);



nextPosition += nextLetter;

})


    }

}


    function getRandomCharacter() {
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return characters.charAt(Math.floor(Math.random() * characters.length));
    }
}
