var playGame = new PlayGame();

function PlayGame() {
    this.updateLetterBoard = updateLetterBoard;
    this.addWordsToLetterBoard = addWordsToLetterBoard;
    this.checkOccupied = checkOccupied;
    var Animals = ["cat", "dog", "tiger", "monkey", "zebra"];
    var Fruits = ["apple", "mango", "banana", "strawberry", "cherry"];
    var Courses = ["java", "html", "python", "c", "c++"];
    var tempWords = [];

    function updateLetterBoard() {
        var selectedCategory = document.getElementById('Category1').value.toLowerCase();

        var letterBoard = document.getElementById("LetterBoard");
        letterBoard.innerHTML = ""; // Clear previous data
    
        var tableOfAlphabet = document.getElementById("tableOfAlphabet");
        tableOfAlphabet.innerHTML = ""; // Clear previous data
        tempWords = [];
    
        switch (selectedCategory) {
            case "animal":
                addWordsToLetterBoard(Animals);
                break;
            case "fruits":
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

        words.forEach(function (word) {
            sizeOfEachCategory = word.length + sizeOfEachCategory;
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
                col.dataset.row = i;
                col.dataset.column = j;
                row.appendChild(col);
            }
            tableOfAlphabet.appendChild(row);
        }
        placeCorrectLetter(words);
        console.log("end of first array ");
        placeCorrectLetter(tempWords);

        $.each($(".matrixTableData"), function (key, item) 
        {
            if ($(item).attr("data-word") === undefined) {
                $(this).html(getRandomCharacter());
             } 
        });
    }



    
    function checkOccupied(words, newStart, orientations) {
        var status = "";
        var incrementBy = 0;
        if (orientations == "row") {
            incrementBy = 1;
        } else if (orientations == "column") {
            incrementBy = 12;
        }

        for (var p = newStart, q = 0; q < words.length; q++) {
            if ($(".matrixTableData:eq(" + p + ")").attr("data-word") == undefined) {
                status = "empty";
            } else {
                status = "occupied";
                break;
            }
            p += incrementBy;
        }
        return status;
    }

    function placeCorrectLetter(words) {
        // Define orientations to place words (row-wise or column-wise)
        var positions = ["row", "column"];
        
        // Loop through each word to place
        for (var i = 0; i < words.length; i++) {
            // Randomly select orientation (row or column)
            var orientations = positions[Math.floor(Math.random() * positions.length)];
            
            // Split the word into individual characters
            var characters = words[i].split("");
            
            // Flag to track if the word is successfully placed
            var placed = false;
            
            // Continue attempting to place the word until it is successfully placed
            while (!placed) {
                // Generate a random starting position
                var start = Math.floor(Math.random() * $(".matrixTableData").length);
                var element = $(".matrixTableData").eq(start);
                var myrow = element.data("row");
                var mycol = element.data("column");
                //console.log(words[i] + " " + orientations + " :" + start + " " + myrow + " " + mycol);

                var newStart, nextLetter;
                
                // Determine the direction and increment for the selected orientation
                if (orientations === "row") {
                    nextLetter = 1; // Increment for row-wise placement
                    // Check if the word can fit within the row
                    if ((mycol * 1) + words[i].length <= 12) {
                        newStart = start; // Word can start at this position
                        placed = true; // Word can be placed in this orientation
                       // console.log("There is space in row  :" + words[i] + " :" + start + " " + mycol);

                    }
                } else if (orientations === "column") {
                    nextLetter = 12; // Increment for column-wise placement
                    // Check if the word can fit within the column
                    if ((myrow * 1) + words[i].length <= 12) {
                        newStart = start; // Word can start at this position
                        placed = true; // Word can be placed in this orientation
                    }
                }
                
                // If the word can be placed in the selected orientation
                if (placed) {
                    // Check if the space is occupied by other words
                    var occupied = checkOccupied(words[i], newStart, orientations);
                    
                    // If the space is empty, place the word
                    if (occupied === "empty") {
                        // Place each character of the word in the grid
                        var nextPosition = 0;
                        $.each(characters, function (key, item) {
                            $(".matrixTableData:eq(" + (newStart + nextPosition) + ")").html(item);
                            $(".matrixTableData:eq(" + (newStart + nextPosition) + ")").attr("data-word", words[i]);
                            $(".matrixTableData:eq(" + (newStart + nextPosition) + ")").css("background-color","yellow")
                            nextPosition += nextLetter; // Move to the next position based on the orientation
                        });
                    } else {
                        // If the space is occupied, add the word to the tempWords array for later placement
                        tempWords.push(words[i]);
                    }
                }
            }
        }
    }
    

    function getRandomCharacter() {
        var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
}
