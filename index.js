// Insere o título digitado na caixa de texto no local reservado ao título da lista.
function changeTitle() {
    const titleElement = document.getElementById("written-title");
    const newTitle = document.getElementById("new-title").value;
    titleElement.innerHTML = newTitle;
    document.getElementById("new-title").value = "";
}

// Risca o ítem da lista quando a 'checkbox' estiver marcada e tira o risco quando ela é desmarcada.
function checkUncheck() {
    if (this.checked) {
        this.nextSibling.style.setProperty("text-decoration", "line-through");
    } else {
        this.nextSibling.style.setProperty("text-decoration", "none");
    }
}

// Apaga um ítem da lista.
function removeItem() {
    this.parentElement.remove();
}

// Adiciona um ítem a lista de acordo com o que é digitado na caixa de texto. 
// Adiciona uma 'checkbox' antes do ítem para que o ítem seja marcado como 'feito'.
// Adiciona um botão depois do ítem para que ele seja deletado.
function addItem() {
    const listElement = document.getElementById("list-element");
    const newItem = document.getElementById("add-to-list").value;
    const listItem = document.createElement("li");
    const checkElement = document.createElement("input");
    checkElement.type = "checkbox";
    listItem.appendChild(checkElement);
    const listItemSpan = document.createElement("span");
    listItem.appendChild(listItemSpan);
    listItemSpan.innerHTML = newItem;
    const listButton = document.createElement("button");
    listButton.type = "button";
    listButton.innerHTML = "[X]";
    listItem.appendChild(listButton);
    listElement.appendChild(listItem);
    document.getElementById("add-to-list").value = "";
}

// Salva o texto de cada ítem na 'local storage' do navegador e o título da lista.
function saveList() {
    let toSave = [];
    const listElement = document.querySelectorAll("#list-element span");
    for (element of listElement) {
        toSave.push(element.textContent);
    }
    localStorage.setItem("listinha", toSave);
    
    const savedTitle = document.getElementById("written-title").textContent;
    localStorage.setItem("titulozinho", savedTitle);
    
    let textToSave = [];
    const savedState = document.querySelectorAll("li span");
    savedState.forEach(function(element) {
        textToSave.push(element.style.textDecoration);
    })
    localStorage.setItem("linhazinha", textToSave);
}

// Limpa o que foi salvo na 'local storage'.
function clean() {
    localStorage.clear();
    location.reload();
}

// Adiciona os 'event listeners' para que as 'checkboxes' e os botões para deletar funcionem.
function manageLis() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (checkbox of checkboxes) {
        checkbox.addEventListener("click", checkUncheck);
    }
    const closeButtons = document.querySelectorAll("li button");
    for (closeButton of closeButtons) {
        closeButton.addEventListener("click", removeItem);
    }
}

// Adiciona título e ítens salvos à lista.
function loadStorage() {
    const listElement = document.getElementById("list-element");
    const toLoad = localStorage.getItem("listinha").split(",");
    toLoad.forEach(function(element) {
        const listItem = document.createElement("li");
        const checkElement = document.createElement("input");
        checkElement.type = "checkbox";
        listItem.appendChild(checkElement);
        const listItemSpan = document.createElement("span");
        listItem.appendChild(listItemSpan);
        listItemSpan.innerHTML = element;
        const listButton = document.createElement("button");
        listButton.type = "button";
        listButton.innerHTML = "[X]";
        listItem.appendChild(listButton);
        listElement.appendChild(listItem);
    })
    
    const title = document.getElementById("written-title");
    const savedTitle = localStorage.getItem("titulozinho");
    title.innerHTML = savedTitle;
    
    const savedState = document.querySelectorAll("li span");
    const stateArray = localStorage.getItem("linhazinha").split(",");
    savedState.forEach(function(item, index) {
        item.style.textDecoration = stateArray[index];

        if (item.style.textDecoration === "line-through") {
        item.previousSibling.checked = true;    
        }
    })
}

// Checa se existe algo salvo na 'local storage' para inserir na lista.
if (localStorage.length != 0) {
    loadStorage();
}

// Executa a função acima, dos 'event listeners', a cada 1 segundo.
setInterval(manageLis, 1000);

// Faz com que o 'enter' seja a mesma coisa que clicar no botão 'OK' para mudar o título.
const newTitle = document.getElementById("new-title");
newTitle.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.querySelector("#change-title button").click();
  }
});

// Faz com que o 'enter' seja a mesma coisa que clicar no botão 'OK' para mudar o novo ítem da lista.
const newItem = document.getElementById("add-to-list");
newItem.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        document.querySelector("#add-item button").click();
  }
});

// A fazer: 
//      - Trocar 'event listeners' por 'onclicks' nos botões.
//      - Salvar o estado de cada ítem (se está marcado ou não).