// call trie
let trie = new Trie();
//sort array of cocktail
radixSort(cocktailArr);

// insert data to trie
for (let i = 0; i < cocktailArr.length; i++) {
  trie.insert(cocktailArr[i].name);
}

//create an alphabet menu list
let alphabetMenu = document.getElementsByClassName("alphabet-menu")[0];
for (let i = 65; i <= 90 ; i++) {
  let char = String.fromCharCode(i);
  let searchValue = trie.find(char);
  createMenuList(alphabetMenu, char, searchValue);
}

//create a spirit menu list
let spiritMenu = document.getElementsByClassName("spirit-menu")[0];
let spirit_set = [...new Set(cocktailArr.map(cocktail => cocktail.spirit))];
radixSort(spirit_set);
spirit_set.forEach(spirit => {
  let searchValue = cocktailArr.filter(cocktail => cocktail.spirit == spirit).map(cocktail => cocktail.name);
  createMenuList(spiritMenu, spirit, searchValue);
});

function createMenuList(menu, value, searchValue) {
  let liElem = document.createElement("li");
  liElem.innerHTML = "<details><summary>" + value + "</summary</details>";
  let searchItem = searchValue;

  let ulElem = document.createElement("ul");
  ulElem.className = "list";
  ulElem.style.display = "none";

  for(let j = 0; j < searchItem.length; j++) {
    ulElem.innerHTML += "<li><a>" + searchItem[j] + "</a></li>";
  }

  // add click event for each item in menu list
  for(let j = 0; j < searchItem.length; j++) {
    ulElem.childNodes[j].firstChild.addEventListener("click", () => {
      if(ulElem.childNodes[j].firstChild.style.color = "blue") {
        ulElem.childNodes[j].firstChild.style.color = "white";
      } else {
        ulElem.childNodes[j].firstChild.style.color = "blue";
      }

      find(cocktailArr, searchItem[j]);
    });
  }

  liElem.appendChild(ulElem);
  liElem.firstChild.addEventListener("click", () => {
    if(ulElem.style.display == "none") {
      ulElem.style.display = "block";
    } else {
      ulElem.style.display = "none";
    }
  });
  menu.appendChild(liElem);
}

//autocomplete box
function autocomplete(inp) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    closeAllLists();

    let val = capital(this.value);
    if (!val) {
      return false;
    }

    currentFocus = -1;
    let divElem = document.createElement("div");
    divElem.setAttribute("id", this.id + "autocomplete-list");
    divElem.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(divElem);

    let searchVal = trie.find(val);

    for (let i = 0; i < searchVal.length; i++) {
      let subDivElem = document.createElement("div");
      subDivElem.innerHTML = "<strong>" +
      searchVal[i].substr(0, this.value.length) + "</strong>" + searchVal[i].substr(val.length);
      subDivElem.innerHTML += "<input type='hidden' value='" + searchVal[i] + "'>";

      subDivElem.addEventListener("click", function (j) {
        inp.value = this.getElementsByTagName("input")[0].value;
        closeAllLists();
      });

      divElem.appendChild(subDivElem);
    }

  });

  inp.addEventListener("keydown", function (e) {
    let item = document.getElementById(this.id + "autocomplete-list");
    if (item) {
      item = item.getElementsByTagName("div");
    }
    if (e.keyCode == 40) {
      currentFocus++;
      active(item);
    } else if (e.keyCode == 38) {
      currentFocus--;
      active(item);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (item) {
          item[currentFocus].click();
        }
      }
    }
  });

  function active(item) {
    if (!item) {
      return false;
    }

    //remove active
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove("autocomplete-active");
    }

    if (currentFocus >= item.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = (item.length - 1);
    }
    item[currentFocus].classList.add("autocomplete-active");
  }

  function closeAllLists(elem) {
    let item = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < item.length; i++) {
      if (elem != item[i] && elem != inp) {
        item[i].parentNode.removeChild(item[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("userInput"));

document.getElementById("searchBtn").onclick = () => {
  let val = document.getElementById("userInput").value;
  find(cocktailArr, val);
}

document.addEventListener("keydown", (e) => {
  if(e.key == "Enter") {
    document.getElementById("searchBtn").click();
  }
});

function find(arr, val) {
  let pola = document.getElementsByClassName("polaroid");
  let des = document.getElementsByClassName("des");
  let ingre = document.getElementsByClassName("ingre");
  let instr = document.getElementsByClassName("instr");
  let spirit = document.getElementsByClassName("spirit");

  // Search data
  let info = arr[binarySearch(arr, val)];

  if (info !== undefined) {
    pola[0].innerHTML = "<img src = " + info.image + "></img>"
    pola[0].innerHTML += "<label>" + info.name + "</label>";
    des[0].innerHTML = "<label><strong>Description:</strong></label>";
    des[0].innerHTML += "<p>"+ info.des +"</p>";
    spirit[0].innerHTML = "<label><strong>Spirit: </strong></label>";
    spirit[0].innerHTML += "<label>" + info.spirit + "</label>";
    ingre[0].innerHTML = "<label><strong>Ingredient:</strong></label>"
    ingre[0].innerHTML += "<p>"+ info.ingre +"</p>";
    instr[0].innerHTML = "<label><strong>Instruction:</strong></label>";
    instr[0].innerHTML += "<p>"+ info.instr +"</p>";
  }
}
