
const getList = async () => {
    let url = 'http://127.0.0.1:5000/produtos';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.produtos.forEach(item => insertList(item.nome, item.quantidade, item.valor))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  getList()
  
  const postItem = async (inputProduct, inputQuantity, inputPrice) => {
    const formData = new FormData();
    formData.append('nome', inputProduct);
    formData.append('quantidade', inputQuantity);
    formData.append('valor', inputPrice);
  
    let url = 'http://127.0.0.1:5000/produto';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/produto?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  const newItem = () => {
    let inputProduct = document.getElementById("newInput").value;
    let inputQuantity = document.getElementById("newQuantity").value;
    let inputPrice = document.getElementById("newPrice").value;
  
    if (inputProduct === '') {
      alert("Escreva o nome de um item!");
    } else if (isNaN(inputQuantity) || isNaN(inputPrice)) {
      alert("Quantidade e valor precisam ser números!");
    } else {
      insertList(inputProduct, inputQuantity, inputPrice)
      postItem(inputProduct, inputQuantity, inputPrice)
      alert("Item adicionado!")
    }
  }
  
  const insertList = (nameProduct, quantity, price) => {
    var item = [nameProduct, quantity, price]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newInput").value = "";
    document.getElementById("newQuantity").value = "";
    document.getElementById("newPrice").value = "";
  
    removeElement()
  }
  
var product = []
var quantity = []
var quantityValue = []  
var price = []
var buttonMinus = []

for(var i = 1; i <= 4; i++) {
 
    product[i] = document.getElementById("product-"+i);  
    buttonMinus[i] = product[i].getElementsByClassName("minus");
    buttonMinus[i][0].disabled = true

    quantity[i] = document.getElementById("value-quantity-"+i);   
    quantityValue[i] = parseInt(quantity[i].value)

    price[i] = parseFloat(product[i].getElementsByClassName("price-product")[0].getElementsByTagName("span")[0].textContent)
}

const buyProduct = (id) => {
    if (confirm(`Preço final: ${Math.round((price[id] * quantityValue[id]) * 100) / 100}`)) {
        alert('Produto comprado com sucesso!')
    }
}

const minus = (id) => {
    (quantityValue[id] - 1) === 1 ? buttonMinus[id][0].disabled = true : buttonMinus[id][0].disabled = false
    quantityValue[id] -= 1; 
    quantity[id].setAttribute('value', quantityValue[id])
}

const plus = (id) => {
    buttonMinus[id][0].disabled = false
    quantityValue[id] += 1;
    quantity[id].setAttribute('value', quantityValue[id])
}
