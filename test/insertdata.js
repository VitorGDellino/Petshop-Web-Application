

//Adciona admin
var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/addAdmin", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro realizado com sucesso");
			// goToAdminRegister();
		}else{
			alert("Erro ao cadastrar");
		}
		console.log(text);
	}
};

data = JSON.stringify({login : "vitor",
	password : "123",
	photo : "",
	name : "Vitor",
	email : "vitorbanana@gmail.com",
	tel : 12341234,
	address : "aquiDoLado",
});
console.log(data);
xhr.send(data);


//Adicionar servicos
var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};

data = JSON.stringify({name : "Banho",
	 photo : "",
	 descricao : "Lavagem de cachorro",
	 preco : 123,
	 hora : 12,
	 date : "2018-07-14",
	 reserva : ''
});
// console.log(data);
xhr.send(data);



var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};
data = JSON.stringify({name : "Banho",
	 photo : "",
	 descricao : "Lavagem de cachorro",
	 preco : 123,
	 hora : 12,
	 date : "2018-07-14",
	 reserva : ''
});
// console.log(data);
xhr.send(data);



var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};
data = JSON.stringify({name : "Banho",
	 photo : "",
	 descricao : "Lavagem de cachorro",
	 preco : 123,
	 hora : 12,
	 date : "2018-07-14",
	 reserva : ''
});
// console.log(data);
xhr.send(data);


var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};
data = JSON.stringify({name : "Banho",
	 photo : "",
	 descricao : "Lavagem de cachorro",
	 preco : 123,
	 hora : 12,
	 date : "2018-07-14",
	 reserva : ''
});
// console.log(data);
xhr.send(data);

//Adicionar produto
var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/products", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			//goToStockManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};

data = JSON.stringify({name : "Racao",
	 photo : "",
	 descricao : "Comida de animal",
	 preco : 123,
	 qtd_estoque : 10,
	 qtd_vendida : 1,
});
// console.log(data);
xhr.send(data);


var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};

data = JSON.stringify({name : "Racao",
	 photo : "",
	 descricao : "Comida de animal",
	 preco : 123,
	 qtd_estoque : 10,
	 qtd_vendida : 1,
});
// console.log(data);
xhr.send(data);


var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};
data = JSON.stringify({name : "Racao",
	 photo : "",
	 descricao : "Comida de animal",
	 preco : 123,
	 qtd_estoque : 10,
	 qtd_vendida : 1,
});
// console.log(data);
xhr.send(data);



var xhr = new XMLHttpRequest();

xhr.open("POST", "http://localhost:3000/admin/services", true);

xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function(){
	if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		var text = xhr.responseText;
		if(text==="ok"){
			alert("Cadastro efetuado com sucesso");
			// goToServiceManager();
		}else{
			alert("Erro no cadastro");
		}
		console.log(text);
	}
};
data = JSON.stringify({name : "Racao",
	 photo : "",
	 descricao : "Comida de animal",
	 preco : 123,
	 qtd_estoque : 10,
	 qtd_vendida : 1,
});
// console.log(data);
xhr.send(data);


//Adicionar pet
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3000/client/addPet", true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function() {
	console.log(data);
}

//pet 1

data = JSON.stringify({login: "", petName: "", petPhoto: "", race: "", age: 10});

xhr.send(data);

var xhr = new XMLHttpRequest();
xhr.open("POST", "http://localhost:3000/client/addPet", true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function() {
	console.log(data);
}

//pet 2
data = JSON.stringify({login: "", petName: "", petPhoto: "", race: "", age: 10});

xhr.send(data);