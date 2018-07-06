//a variavel state é usada para saber se é necessario mudar as colunas laterais ou apenas a coluna do meio
state = 0;
loggedUser = "";
pet_id = 0;
cart = [];
valorTotaldaCompra = 0;

//Funcao que carrega a pagina Home
function goToHome(){
    $(document).ready( function(){
        document.body.style.backgroundImage = "url(./assets/background.png)";
        $("#mutableContent").load("../html/home.html");
        state = 0;
    });

}

//Funcao que carrega a pagina de produtos
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToProducts(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/produtos.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioprodutos.html");
        }
        state = 1;
    });
}

//Funcao que carrega a pagina de servicos
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToServices(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/servicos.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioservicos.html");
        }
        state = 1;
    });
}

//Funcao que carrega a pagina de about
function goToAbout(){
    $(document).ready( function(){
        $("#mutableContent").load("../html/about.html");
        document.body.style.backgroundImage = "none";
        state = 0;
    });
}

//Funcao que carrega a pagina de registrar administradores
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToAdminRegister(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/admregister.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioadminregister.html");
        }
        state = 1;
    });
}

//Funcao que carrega a pagina de registrar clientes
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToClientRegister(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/clientregister.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioclientregister.html");

        }
        state = 1;
    });
}

//Funcao que carrega a pagina de gerenciamento de servicos
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToServiceManager(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/servicesmanager.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioservicesmanager.html");
        }

        listServices();
        state = 1;
    });
}

//Funcao que carrega a pagina de gerenciamento de produtos
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToStockManager(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/stockmanager.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiostockmanager.html");
        }
        listStock();
        state = 1;
    });
}

// Funcao que lista os produtos disponiveis para comprar
function listProductsToBuy(){
    $(document).ready( function(){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/utils/products", true);

        xhr.onload = function() {
            var text = xhr.responseText;
          // console.log(JSON.parse(text).length);
            // console.log(text);
            text = text.split("}")
            text.pop();
            // console.log(text)
            list = []
            for (var i = 0; i < text.length; i++) {
                text[i] = text[i].substr(1) + "}";
                list.push(JSON.parse(text[i]));
            }
            console.log(list);
            changeHTML(list, list.length, "#buy");
        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);
    });
}

//Funcao que carrega a pagina de comprar produto
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToBuy (){
    $(document).ready( function(){

        if(state == 0){
            $("#mutableContent").load("../html/buy.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiobuy.html");
        }
        cart = [];
        valorTotaldaCompra = 0;
        listProductsToBuy();
        state = 1;
    });
}

// Funcao que insere os produtos no carrinho
function insertInCart(product){
    //console.log(product.id)
    var quantity = $("#"+product.id).val();
    var hasUpdate = false;
    if(quantity != "") {
        aux = {
            name: product.id,
            quant: parseInt(quantity)
        };
        for (var item in cart) {
            if (cart[item].name == product) {//Este produto ja esta inserido
                //atualiza somente a quantidade dele
                cart[item].quant = parseInt(quantity);
                hasUpdate = true;
            }
        }

        if (!hasUpdate) {
            cart.push(aux);
            hasUpdate = false;
        }
    } else {
        for (var elem in cart) {
            if (cart[elem].name == product) {
                delete cart[elem];
            }
        }
    }
}

// Funcao que calcula o valor da compra e muda o html para finalizar o pagamento
function finalizeBuy(){
    $(document).ready( function(){

        var valorDaCompra = 0;
        var n = 0;
        var table = [];
        var n2 = 0;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/utils/products", true);

        xhr.onload = function() {
            var text = xhr.responseText;
            text = text.split("}")
            text.pop();
            // console.log(text)
            result = []
            for (var i = 0; i < text.length; i++) {
                text[i] = text[i].substr(1) + "}";
                result.push(JSON.parse(text[i]));
            }
            // console.log(list);
            n = result.length;
            flag = 0;
            c_len = cart.length;
            for(j=0;j<c_len;j++){
                for(i=0;i<n;i++){
                    if(cart[j].name === result[i].name){
                        if(cart[j].quant > result[i].qtd_estoque){
                            alert ("Quantidade de item nao disponivel em estoque");
                            goToBuy();
                            cart = [];
                            flag = 1;
                            break;
                        }else{
                            valorDaCompra+=(result[i].preco*cart[j].quant);
                            table[n2] = result[i];
                            updateStorage(result[i]._id, cart[j].quant);
                            n2++;
                        }
                    }
                }
            }

            if(flag != 1){
                //console.log("VALOR DA COMPRA" + valorDaCompra);
                changeHTML(table,n2, '#cartList');
                changeHTML(0, valorDaCompra, '#finalizeBuy');
                valorTotaldaCompra = valorDaCompra;
            }

        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);

    });
}

// Funcao que carrega o codigo html para finalizar a compra de produtos
function goToFinalizeBuy(){
        $("#mutableMiddleColumn").load("../html/colunameioprodutocartao.html");
        state = 1;
        finalizeBuy();
}

// Funcao que insere a venda realizada no banco de Dados
function finishingSale() {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/utils/buy", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        console.log("DEU CERTO");
    }
    var itens = "";
    for (i=0;i<cart.length;i++) {
        itens += cart[i].name + "," + cart[i].quant + ". ";
    }
    data = JSON.stringify({user: loggedUser, itens: itens, total: valorTotaldaCompra});

    xhr.send(data);
}

// Funcao que efetiva a compra em si
function afterBuy() {
    numero = $("#cartaoInput").val();
    //console.log(numero);
    if (numero == "") {
        alert('O numero do cartao deve ser preenchido!');
    } else {
        alert('compra realizada com sucesso!');
        finishingSale();
        goToHome();
    }
}

// Funcao que atualiza o estoque após uma venda
function updateStorage(id, quantidadeVendida) {

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:3000/utils/updateStock", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {

    }

    data = JSON.stringify({id: id, qtd: quantidadeVendida});

    xhr.send(data);
}

//Funcao que carrega a pagina de editar o proprio usuario
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToEditRegister(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/edit.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameioedit.html");
        }
        state = 1;
    });
}

//Funcao que carrega a pagina de listar pets
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToRegisterOrListPet(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/pet.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunameiopet.html");
        }
        listPets();
        state = 1;
    });
}

//Funcao que carrega a pagina de agendamento de servico
//Se o state for igual a 0, é necessario mudar as colunas laterais e a coluna do meio do HTML
function goToSchedule(){
    $(document).ready( function(){
        if(state == 0){
            $("#mutableContent").load("../html/calendarioservicosescolherdia.html");
            document.body.style.backgroundImage = "none";
        }else{
            $("#mutableMiddleColumn").load("../html/colunaMeioCalendarioServicosEscolherDia.html");
        }
        state = 1;
    });
}

//Funcao que carrega a pagina de deletar servicos
function goToDeleteService(){
	$("#mutableMiddleColumn").load("../html/colunameiodeletarservico.html");
    state = 1;
}

//Funcao que carrega a pagina de atualizar servicos
function goToUpdateService(){
	$("#mutableMiddleColumn").load("../html/colunameioatualizarservico.html");
    state = 1;
}

//Funcao que carrega a pagina de registrar servicos
function goToRegisterService(){
	$("#mutableMiddleColumn").load("../html/colunameiocadastrarservico.html");
    state = 1;
}

//Funcao que carrega a pagina de deletar produtos
function goToDeleteProduct(){
	$("#mutableMiddleColumn").load("../html/colunameiodeletarprodutos.html");
    state = 1;
}

//Funcao que carrega a pagina de atualizar produtos
function goToUpdateProduct(){
	$("#mutableMiddleColumn").load("../html/colunameioatualizarprodutos.html");
    state = 1;
}

//Funcao que carrega a pagina de cadastrar produtos
function goToRegisterProduct(){
	$("#mutableMiddleColumn").load("../html/colunameiocadastrarprodutos.html");
    state = 1;
}

//Funcao que carrega a pagina de selecionar horario para fazer o agendamento de servico
function goToSelectHour(table2, n2, id){
	$("#mutableMiddleColumn").load("../html/colunaMeioCalendarioServicosEscolherHorario.html");
    state = 1;
    changeHTML(table2, n2, id);
}

//Funcao que carrega a pagina de fazer o cadastro do agendamento de servico
function goToFinalizeService(){
    $("#mutableMiddleColumn").load("../html/colunameioschedule.html");
    state = 1;
}

//Funcao que carrega a pagina de registrar um novo animal
function goToRegisterPet(){
    $("#mutableMiddleColumn").load("../html/colunameiocadastraranimais.html");
    state = 1;
}

//Funcao que carrega a pagina de editar um animal que ja exista
function goToEditPet(id){
    $("#mutableMiddleColumn").load("../html/colunameioeditaranimais.html");
    state = 1;
    pet_id = id;
}

//funcao para carregar a foto no tamanho certo
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#photo')
                .attr('src', e.target.result)
                .width(130)
                .height(130);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

//Funcao para registrar os animais
function registerPet(){
    $(document).ready( function(){
        var petName = $("#petName").val();
        var race = $("#race").val();
        var petPhoto = $("#photo").attr('src');
        var age = $("#age").val();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/client/addPet", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            console.log(data);
        }

        data = JSON.stringify({login: loggedUser, petName: petName, petPhoto: petPhoto, race: race, age: age});

        xhr.send(data);

        goToRegisterOrListPet();
    });
}

//funcao para editar os animais
function editPet(){
    $(document).ready( function(){

        console.log("entrou edit");

        var newPetName = $("#petName").val();
        var newPetPhoto = $("#photo").attr('src');
        var newRace = $("#race").val();
        var newAge = $("#age").val();

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3000/client/pets/"+pet_id, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {

        }

        data = JSON.stringify({petName: newPetName, photo: newPetPhoto, race: newRace, age: newAge});

        xhr.send(data);

        goToRegisterOrListPet();


    });

}

//Funcao para editar o proprio usuario
function editProfile(){
    $(document).ready(function(){

        var newName = $("#newName").val();
        var newPhoto = $("#photo").attr('src');
        var newLogin = $("#newLogin").val();
        var oldPassWord = $("#oldPassWord").val();
        var newPassWord = $("#newPassWord").val();
        var newPassWord2 = $("#newPassWord2").val();
        var newAdress = $("#newAdress").val();
        var newTel = $("#newTel").val();
        var newEmail = $("#newEmail").val();
        var isAdmin = false;

        if ((newPassWord != newPassWord2) && (newPassWord == "")) {
            alet("As senhas devem ser iguais!");
        } else {

            var xhr = new XMLHttpRequest();
            xhr.open("PUT", "http://localhost:3000/client/userUpdate/"+loggedUser, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var text = xhr.responseText;
                    if(text==="OK"){
                        alert("Atualizado com sucesso");
                        goToHome();
                    }else{
                        alert("Erro para atualizar");
                    }
                }
            };

            data = JSON.stringify({name: newName, photo: newPhoto, password: oldPassWord, newPassWord: newPassWord, newPassWord2: newPassWord2, address: newAdress, tel: newTel, email: newEmail});

            xhr.send(data);

        }
    });
}

//Funcao que carrega o card de foto e o nome de usuario quando é logado
function userCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/usercard.html", function(){
            $("#personName").html(name);
            $("#userPhoto").attr('src', photo);
        });
    });
}

//funcao que carrega o card de foto e o nome de administrador quando eh logado
function adminCard(name, photo){
    $(document).ready( function(){
        $("#mutableCard").load("../html/admincard.html", function(){
            $("#personName").html(name);
            $("#photoAdmin")
                .attr('src', photo)
                .width(130)
                .height(130);
        });
    });
}

//Carrega o html da parte do card de login
function loginCard(){
    $(document).ready( function(){
        $("#mutableCard").load("../html/logincard.html");
    });
}

//carrega a barra de navegacao do usuario
function userNavBar(){
    $(document).ready( function(){
        $("#mutableNavBar").load("../html/usernavbar.html");
    });
}

//Carrega a barra de navegacao quando n esta logado
function guestNavBar(){
    $(document).ready( function(){
        $("#mutableNavBar").load("../html/guestnavbar.html");
    });
}

//carrega a barra de navegacao do administrador
function adminNavBar(){
    $(document).ready( function(){
        $("#mutableNavBar").load("../html/adminnavbar.html");
    });
}


//Funcao que deleta o animal do usuario do banco de dados
function deletePet(id){
    console.log("antes");
    $(document).ready( function(){
        if(confirm("Deseja mesmo deletar esse Animal?")){
            console.log(id);

            var xhr = new XMLHttpRequest();
            xhr.open("DELETE", "http://localhost:3000/client/pets/"+id, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onreadystatechange = function() {
                console.log("DEU CERTO");
            }

            xhr.send(null);

            goToRegisterOrListPet();
        }
    });
}

//Funcao para carregar os valores nas txtbox da pagina de servicos
function carregarServico(){
	$(document).ready( function(){
        var id = $("#ID").val();

		console.log(id);

		var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/utils/servicesById/"+id, true);

        xhr.onload = function() {
            var text = xhr.responseText;
            console.log(JSON.parse(text).length);
            console.log(text);

			if(text==="erro"){
				alert("Erro para achar o servico");
			}else{
				text = text.split("}")
				text.pop();
				console.log(text)
				list = []
				for (var i = 0; i < text.length; i++) {
					text[i] = text[i].substr(1) + "}";
					list.push(JSON.parse(text[i]));
				}

				$("#productName").val(list[0].name);
				$("#photo")
                .attr('src', list[0].photo)
                .width(130)
                .height(130);
				$("#descricao").val(list[0].descricao);
				$("#price").val(list[0].preco);
				$("#hour").val(list[0].hora);
				$("#date").val(list[0].date);
			}

            // console.log(list);
        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);

    });
}

function atualizarServico(){

	$(document).ready( function(){
		try{
			var id = $("#ID").val();
			var name = $("#productName").val();
            var photo = $("#photo").attr('src');
			var descricao = $("#descricao").val();
            var date = $("#date").val();
			var preco = $("#price").val();
            var hour = $("#hour").val();

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(name !== "" && descricao !== "" && date !== "" && preco !== "" && hour !== ""){

				var xhr = new XMLHttpRequest();

				xhr.open("PUT", "http://localhost:3000/admin/services/" + id, true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						if(text==="ok"){
							alert("Alteração efetuada com sucesso");
							goToServiceManager();
						}else{
							alert("Erro na alteração");
						}
						console.log(text);
					}
				};

				data = JSON.stringify({name : name,
					 photo : photo,
					 descricao : descricao,
					 preco : preco,
					 hora : hour,
					 date : date,
				});
				console.log(data);
				xhr.send(data);

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });

}

//Funcao que deleta o servico escolhido
function deletarServico(){
	$(document).ready( function(){
		try{

			var id = $("#ID").val();
			var name = $("#productName").val();
            var descricao = $("#descricao").val();
            var price = $("#price").val();
            var hour = $("#hour").val();
            var date = $("#date").val();

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(id !== "" && name !== "" && descricao !== "" && price !== "" && hour !== "" && date !== ""){

				var xhr = new XMLHttpRequest();

				xhr.open("DELETE", "http://localhost:3000/admin/services/" + id, true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						if(text==="ok"){
							alert("Deletado com sucesso");
							goToServiceManager();
						}else{
							alert("Erro para deletar");
						}
						console.log(text);
					}
				};

				xhr.send(null);

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });

}

//Funcao de carregar produto
//Funciona da mesma maneira q carregarServico()
function carregarProduto(){
	$(document).ready( function(){
        var id = $("#ID").val();

		console.log(id);

		var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/utils/products/"+id, true);

        xhr.onload = function() {
            var text = xhr.responseText;
            console.log(JSON.parse(text).length);
            console.log(text);

			if(text==="erro"){
				alert("Erro para achar o servico");
			}else{
				text = text.split("}")
				text.pop();
				console.log(text)
				list = []
				for (var i = 0; i < text.length; i++) {
					text[i] = text[i].substr(1) + "}";
					list.push(JSON.parse(text[i]));
				}

				$("#productName").val(list[0].name);
				$("#photo")
                .attr('src', list[0].photo)
                .width(130)
                .height(130);
				$("#descricao").val(list[0].descricao);
				$("#price").val(list[0].preco);
				$("#stock").val(list[0].qtd_estoque);
				$("#sold").val(list[0].qtd_vendida);
			}

            // console.log(list);
        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);

    });
}

//Funcao de atualizar produto
//Funciona da mesma maneira q atualizarServico()
function atualizarProduto(){
	$(document).ready( function(){
		try{
			var id = $("#ID").val();
			var name = $("#productName").val();
            var descricao = $("#descricao").val();
            var photo = $("#photo").attr('src');
            var price = $("#price").val();
            var stock = $("#stock").val();
            var sold = $("#sold").val();

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(name !== "" && descricao !== "" && price !== "" && stock !== "" && sold !== ""){

				var xhr = new XMLHttpRequest();

				xhr.open("PUT", "http://localhost:3000/admin/products/" + id, true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						if(text==="ok"){
							alert("Alteração efetuada com sucesso");
							goToStockManager();
						}else{
							alert("Erro na alteração");
						}
						console.log(text);
					}
				};

				data = JSON.stringify({name : name,
					 photo : photo,
					 descricao : descricao,
					 preco : price,
					 qtd_estoque : stock,
					 qtd_vendida : sold,
				});
				console.log(data);
				xhr.send(data);

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

//Funcao de deletar produto
//Funciona da mesma maneira q deletarServico()
function deletarProduto(){

	$(document).ready( function(){
		try{

			var id = $("#ID").val();
			var name = $("#productName").val();
			var descricao = $("#descricao").val();
			var preco = $("#price").val();
			var stock = $("#stock").val();
			var sold = $("#sold").val();

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(id !== "" && name !== "" && descricao !== "" && preco !== "" && stock !== "" && sold !== ""){

				var xhr = new XMLHttpRequest();

				xhr.open("DELETE", "http://localhost:3000/admin/products/" + id, true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						if(text==="ok"){
							alert("Deletado com sucesso");
							goToStockManager();
						}else{
							alert("Erro para deletar");
						}
						console.log(text);
					}
				};

				xhr.send(null);

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

//Funcao para mudar o html da pagina, por exemplo na parte de listar servicos e produtos
function changeHTML(table, n, id){
    if (id === '#cartList'){
        var eachline = "";
        for (i=0;i<n;i++) {
            eachline += '<li><img class="imgProdProdutoCartaoCliente" src="'+table[i].photo+'" scrolling="no" alt="Instagram"/><br>'+ table[i].name +'<br>Quantidade: '+ cart[i].quant +'<br></li>';
        }
    }else if (id === "#finalizeBuy"){
        var eachline = 'Preço: '+ n.toFixed(2).toString() +'<br>Cartão de Crédito: <input id="cartaoInput" type="text" name="quantCompra"><br><button class="btn" type="button" onclick="afterBuy();">Finalizar</button>';
    }else if(id === "#estoque"){		//Listar produtos
        var eachline = "<tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Preço</th><th>Quantidade em estoque</th><th>Quantidade vendida</th></tr>";
        for(i=0; i<n; i++){
            eachline += "<tr><td>"+ table[i]._id+"</td><td>"+ table[i].name+"</td><td>"+table[i].descricao+"</td><td>"+table[i].preco.toString()+"</td><td>"+table[i].qtd_estoque.toString()+"</td><td>"+table[i].qtd_vendida.toString()+"</td></tr>";
        }
    }else if(id === "#servicos"){		//Listar servicos
        var eachline = "<tr><th>Id</th><th>Nome</th><th>Descrição</th><th>Preço</th></tr>";
        for(i=0; i<n; i++){
            eachline += "<tr><td>"+ table[i]._id+"</td><td>"+ table[i].name+"</td><td>"+table[i].descricao+"</td><td>"+table[i].preco.toString()+"</td></tr>";
        }
    }else if(id === "#buy"){
        var eachline = ""
        for(i=0; i<n; i++){
            eachline += '<li><img class="imgProdProdutoCartaoCliente" src="'+ table[i].photo+'" scrolling="no" alt="Produto"/><br>'+table[i].name+'<br>Preco: '+table[i].preco+'<br><input id="'+table[i].name+'" name="quantCompra" type="number" min="0"><a  class="icons" onclick="insertInCart('+table[i].name+');"><img class="image" src="/assets/AddShop.png" alt="Carrinho"/></a></li>'
        }

    }else if(id === "#animais"){
		console.log("ta entrando");
        var eachline = ""
		eachline += '<select id="pet">'
        for(i=0; i<n; i++){
			eachline += ' <option value="'+ table[i].petName +'">' + table[i].petName + '</option>'
        }
		eachline += '</select>' + "<br><br>" + 'Cartão de Crédito: <input type="text">'

    }else if(id === "#reservas"){		//Listar reservas
        var eachline="";
        for(i=0; i<n; i++){
            console.log(n);
			if(table[i].reserva==="none"){
                console.log("aqui");
				eachline += '<li><font size="3"> HORÁRIO LIVRE </font>Servico: '+table[i].name+'<br><img src="'+table[i].photo+'" alt="Someone" style="width:130px; height:130px;"><br>Animal: <br>Preço: R$'+table[i].preco+"<br>" + '<a><button id="'+table[i]._id+'" class="btn" type="button" onClick="Reservar(this.id);">Reservar</button></a></li>';
			}else{
				eachline += '<li><font size="3" color="red"> HORÁRIO RESERVADO </font>Servico: '+table[i].name+'<br><img src="'+table[i].photo+'" alt="Someone" style="width:130px; height:130px;"><br>Animal: '+table[i].reserva+ "<br>" + '<a><button  id="'+table[i]._id+'"class="btn" type="button" disabled onClick="Reservar(this.id);">Reservar</button></a></li>';
			}
		}
    }else if(id === "#pets"){
        var eachline="";
        console.log("ANIMAIS");
        for(i=0; i<n; i++){
            console.log(typeof(table[i]._id), table[i]._id);
            eachline += '<li><img src="'+ table[i].petPhoto+ '" alt="Someone" style="width:130px; height:130px;"/><br>Nome: ' + table[i].petName + "<br>Raça: " + table[i].race + "<br>Idade: " + table[i].age.toString() + "<br>" + '<a><button class="btn" type="button" id="'+table[i]._id.toString()+'"onclick="goToEditPet(this.id)">Atualizar</button></a><button class="btn" type="button"  id="'+table[i]._id.toString()+'"onclick="deletePet(this.id)">Deletar</button><br></li>';
        }
    }
    //console.log(id);
    $(id).html(eachline);
}

function Reservar(id){
	$(document).ready( function(){

        console.log("entrou aqui");

        var pet = $("#pet").val();
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3000/client/dateservice", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function() {
            var text = xhr.responseText;
            if (text == "Horário indisponível") {
                alert(text);
            }
        }
        data = JSON.stringify({id: id, petname: pet, user: loggedUser});
        console.log(data);
        xhr.send(data);
        listScheduleService();
    });
}

function listScheduleService(){
    $(document).ready( function(){

        var date = $("#Calendario").val();

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/client/pets/"+loggedUser, true);
        xhr.onload = function() {
            var text = xhr.responseText;
            text = text.split("}")
            text.pop();
            list = [];
            for (var i = 0; i < text.length; i++) {
                text[i] = text[i].substr(1) + "}";
                list.push(JSON.parse(text[i]));
            }

            changeHTML(list, list.length, "#animais");

        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);

        var xhr2 = new XMLHttpRequest();
        xhr2.open("GET", "http://localhost:3000/utils/services/"+date);
        xhr2.onload = function() {
            var text = xhr2.responseText;
            text = text.split("}")
            text.pop();
            list = [];
            n = 0;
            for (var i = 0; i < text.length; i++) {
                console.log("entro for");
                text[i] = text[i].substr(1) + "}";
                var aux = JSON.parse(text[i]);
                list.push(aux);
                n++;
            }

            console.log(list);
            if (n > 0) {
                changeHTML(list, list.length, "#reservas");
            } else {
                alert("nao tem servicos reservados para esse dia!");
            }

        };
        xhr2.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr2.send(null);
    });
}

//Funcao para listar os animais
function listPets(){
    $(document).ready( function(){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/client/pets/"+loggedUser, true);
        xhr.onload = function() {
            var text = xhr.responseText;
          // console.log(JSON.parse(text).length);
            // console.log(text);
            text = text.split("}")
            text.pop();
            // console.log(text)
            list = []
            for (var i = 0; i < text.length; i++) {
                text[i] = text[i].substr(1) + "}";
                list.push(JSON.parse(text[i]));
            }
            console.log("FJAKSHDFLKJAHSDKFHAKSDH");
            console.log(list);
            changeHTML(list, list.length, "#pets");
        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);
    });
}


//Funcao para listar os produtos
//Funciona do mesmo jeito q a listPets()
function listStock(){

	$(document).ready( function(){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/utils/products", true);

        xhr.onload = function() {
            var text = xhr.responseText;
            // console.log(JSON.parse(text).length);
            // console.log(text);
            text = text.split("}")
            text.pop();
            // console.log(text)
            list = []
            for (var i = 0; i < text.length; i++) {
                text[i] = text[i].substr(1) + "}";
                list.push(JSON.parse(text[i]));
            }
            // console.log(list);
            changeHTML(list, list.length, "#estoque");
        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);
    });

}

//Funcao para listar os servicos
//Funciona do mesmo jeito q a listPets()
function listServices(){

	$(document).ready( function(){

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/utils/services", true);

        xhr.onload = function() {
            var text = xhr.responseText;
            text = text.split("}")
            text.pop();
            list = []
            for (var i = 0; i < text.length; i++) {
                text[i] = text[i].substr(1) + "}";
                list.push(JSON.parse(text[i]));
            }
            // console.log(list);
            changeHTML(list, list.length, "#servicos");
        };
        xhr.onerror = function() {
          alert('Woops, there was an error making the request.');
        };
        xhr.send(null);
    });
}


//Funcao para registrar os administradores
function registerAdmin(){
	$(document).ready( function(){
		try{

			var name = $("#name").val();
            var login = $("#login").val();
            var photo = $("#photo").attr('src');
            var password = $("#passWord").val();
            var password2 = $("#passWord2").val();
            var address = $("#address").val();
            var tel = $("#tel").val();
            var email = $("#email").val();

			// console.log(name);
			// console.log(login);
			// console.log(photo);
			// console.log(passWord);

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(name !== "" && login !== "" && password !== "" && password2 !== "" && address !== "" && tel !== "" && email !== ""){
                if(password === password2){

					var xhr = new XMLHttpRequest();

					xhr.open("POST", "http://localhost:3000/admin/addAdmin", true);

					xhr.setRequestHeader("Content-Type", "application/json");

					xhr.onreadystatechange = function(){
						if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
							var text = xhr.responseText;
							if(text==="ok"){
								alert("Cadastro realizado com sucesso");
								goToAdminRegister();
							}else{
								alert("Erro ao cadastrar");
							}
							console.log(text);
						}
					};

					data = JSON.stringify({login : login,
						password : password,
						photo : photo,
						name : name,
						email : email,
						tel : tel,
						address : address,
					});
					console.log(data);
					xhr.send(data);

                }else{
                    alert("Senhas diferem");
                }
            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

//Funcao para registrar os clientes
//Funciona do mesmo jeito que registerAdmin()
function registerClient(){

	$(document).ready( function(){
		try{

			var name = $("#name").val();
            var login = $("#login").val();
            var photo = $("#photo").attr('src');
            var password = $("#passWord").val();
            var password2 = $("#passWord2").val();
            var address = $("#address").val();
            var tel = $("#tel").val();
            var email = $("#email").val();

			// console.log(name);
			// console.log(login);
			// console.log(photo);
			// console.log(passWord);

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(name !== "" && login !== "" && password !== "" && password2 !== "" && address !== "" && tel !== "" && email !== ""){
                if(password === password2){

					var xhr = new XMLHttpRequest();

					xhr.open("POST", "http://localhost:3000/admin/addUser", true);

					xhr.setRequestHeader("Content-Type", "application/json");

					xhr.onreadystatechange = function(){
						if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
							var text = xhr.responseText;
							if(text==="ok"){
								alert("Cadastro efetuado com sucesso");
								goToClientRegister();
							}else{
								alert("Erro ao cadastrar");
							}
							console.log(text);
						}
					};

					data = JSON.stringify({login : login,
						password : password,
						photo : photo,
						name : name,
						email : email,
						tel : tel,
						address : address,
					});
					console.log(data);
					xhr.send(data);

                }else{
                    alert("Senhas diferem");
                }
            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });

}

//Funcao para registrar os produtos
//Funciona do mesmo jeito que registerAdmin()
function registerProduct(){
	$(document).ready( function(){
		try{

			var name = $("#productName").val();
            var descricao = $("#descricao").val();
            var photo = $("#photo").attr('src');
            var price = $("#price").val();
            var stock = $("#stock").val();
            var sold = $("#sold").val();

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(name !== "" && descricao !== "" && price !== "" && stock !== "" && sold !== ""){

				var xhr = new XMLHttpRequest();

				xhr.open("POST", "http://localhost:3000/admin/products", true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						if(text==="ok"){
							alert("Cadastro efetuado com sucesso");
							goToStockManager();
						}else{
							alert("Erro no cadastro");
						}
						console.log(text);
					}
				};

				data = JSON.stringify({name : name,
					 photo : photo,
					 descricao : descricao,
					 preco : price,
					 qtd_estoque : stock,
					 qtd_vendida : sold,
				});
				console.log(data);
				xhr.send(data);

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

//Funcao para registrar os servicos
//Funciona do mesmo jeito que registerAdmin()
function registerService(){
    $(document).ready( function(){
		try{

			var name = $("#productName").val();
            var descricao = $("#descricao").val();
            var photo = $("#photo").attr('src');
            var price = $("#price").val();
            var hour = $("#hour").val();
            var date = $("#date").val();

			//Verifica se o q foi colocado nas txtbox n esta vazio
            if(name !== "" && descricao !== "" && price !== "" && hour !== "" && date !== ""){

				var xhr = new XMLHttpRequest();

				xhr.open("POST", "http://localhost:3000/admin/services", true);

				xhr.setRequestHeader("Content-Type", "application/json");

				xhr.onreadystatechange = function(){
					if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
						var text = xhr.responseText;
						if(text==="ok"){
							alert("Cadastro efetuado com sucesso");
							goToServiceManager();
						}else{
							alert("Erro no cadastro");
						}
						console.log(text);
					}
				};

				data = JSON.stringify({name : name,
					 photo : photo,
					 descricao : descricao,
					 preco : price,
					 hora : hour,
					 date : date
				});
				// console.log(data);
				xhr.send(data);

            }else{
                alert("É necessário preencher todos os campos!");
            }
        }catch(err){
			console.log(err.message);
        }
    });
}

//Funcao para fazer o login de usuario
function userLogin(){
	try{
        var userName = document.getElementById("login").elements.namedItem("userName").value;
        var passWord = document.getElementById("login").elements.namedItem("passWord").value;
        loggedUser = userName;

		var xhr = new XMLHttpRequest();

		xhr.open("POST", "http://localhost:3000/utils/login", true);

		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function(){
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				var text = xhr.responseText;
				if(text==="erro"){
					alert("Usuario e senha inválidas");
				}else{
					userNavBar();
					var inf = JSON.parse(text);
					userCard(userName, inf.photo);
				}
				// console.log(text);
			} else if (this.readyState == XMLHttpRequest.DONE){
                alert('Usuário ou senha inválidos');
            }
		};

		data = JSON.stringify({login: userName,password: passWord});
		//console.log(data);

		xhr.send(data);

    }catch(err){
        console.log(err.message);
    }
}

//Funcao para fazer o login de administrador
//Funciona da mesma maneira que o userLogin()
//Faz uma checagem para ver se o usuario tem acesso de administrador
function adminLogin(){

	try{
        var userName = document.getElementById("login").elements.namedItem("userName").value;
        var passWord = document.getElementById("login").elements.namedItem("passWord").value;
        loggedUser = userName;

        //console.log(userName);
        //console.log(passWord);
		//Pega os valores das txtbox do html

		var xhr = new XMLHttpRequest();

		xhr.open("POST", "http://localhost:3000/utils/loginAdmin", true);

		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function(){
			// if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			// 	var text = xhr.responseText;
			// 	// console.log(text);
			// 	if(text==="erro"){
			// 		alert("Usuario e senha inválidas");
			// 	}else{
			// 		adminNavBar();
			// 		var inf = JSON.parse(text);
			// 		adminCard(userName, inf.photo);
			// 	}
			// 	// console.log(text);
			// }
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
				var text = xhr.responseText;
				if(text==="erro"){
					alert("Usuario e senha inválidas");
				}else{
					adminNavBar();
					var inf = JSON.parse(text);
					adminCard(userName, inf.photo);
				}
				// console.log(text);
			} else if (this.readyState == XMLHttpRequest.DONE){
                alert('Usuário ou senha inválidos');
            }
        };

		data = JSON.stringify({login: userName,password: passWord});
		//console.log(data);

		xhr.send(data);

    }catch(err){
        console.log(err.message);
    }
}
//Funcao para deslogar do site
function logout(){
    try{
        guestNavBar();
        loginCard();
        goToHome();
    }catch(err){
        console.log(err.message)
    }
}
