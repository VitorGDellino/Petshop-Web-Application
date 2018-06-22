//estoque: id, nome, preco, quantidadeRestante, quantidadeVendidas
//servicos: id, nome, dia, horario, preco, estaDisponivel, nomeDoAnimal
//cliente: nome, foto, usuario, senha, cpf, isAdmin
//animais: id, nomeDoAnimal, foto, usuarioDoDono, raca, idade, tipoDeAnimal, servico que esteja recebendo, custo total dos servicos
$(document).ready( function(){
    var request = indexedDB.open("petshop", 3);

    console.log("Veio aqui");

    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        var users = db.createObjectStore("Usuarios", {keyPath: "login"});
        var stock = db.createObjectStore("Estoque", {keyPath: "id", autoIncrement: true});
        var services = db.createObjectStore("Servicos", {keyPath: "id", autoIncrement: true});
        var pet = db.createObjectStore("Animais", {keyPath: "id", autoIncrement: true});
        var sales = db.createObjectStore("Vendas", {keypath: "id", autoIncrement: true});

        var transaction = event.target.transaction;

        var store = transaction.objectStore("Usuarios");

        var user = {
            name: "Vitor",
            photo: "/images/users/vitoradm.jpg",
            login: "Vitor",
            passWord: "1234",
            address: "AV 3",
            tel: 38070477,
            email: "vitor.dellinocente@usp.br",
            isAdmin: true
        };

        var add = store.add(user);

        user = {
            name: "Jorge",
            photo: "/images/users/jorgeadm.jpg",
            login: "Jorge",
            passWord: "321",
            address: "AV 4",
            tel: 38998789,
            email: "jorge.motokubo@usp.br",
            isAdmin: true
        };

        add = store.add(user);

        user = {
            name: "Raul",
            photo: "/images/users/rauladm.jpg",
            login: "Raul",
            passWord: "312",
            address: "AV 5",
            tel: 38587869,
            email: "raul.costa@usp.br",
            isAdmin: true
        };

        add = store.add(user);

        store = transaction.objectStore("Servicos");

        var service = {
            name: "Banho",
			photo: "/assets/banho.jpg",
            descricao: "Lavagem de animais",
            preco: 59.99,
			hora: 8,
			date: "2018-06-09",
			reserva: "none"
        };

        add = store.add(service);

        service = {
            name: "Tosa",
			photo: "/assets/tosa.jpg",
            descricao: "Tosa de animais",
            preco: 25.99,
			hora: 9,
			date: "2018-06-08",
			reserva: "none"
        };

        add = store.add(service);

        service = {
            name: "Veterinario de plantao",
			photo: "/assets/vet.png",
            descricao: "Checar a disponibilidade de um veterinario",
            preco: 89.99,
			hora: 10,
			date: "2018-06-08",
			reserva: "Yuki"
        };

        add = store.add(service);

        service = {
            name: "Adestramento",
			photo: "/assets/adestramento.jpg",
            descricao: "Serviço de adestramento de animais",
            preco: 150,
			hora: 11,
			date: "2018-06-07",
			reserva: "none"
        };

        add = store.add(service);

        store = transaction.objectStore("Estoque");

        var product = {
            name: "Advantage 3",
			photo: "/assets/max.jpg",
            descricao: "Remedio anti-pulga para cachorro",
            preco: 49.99,
            qtd_estoque: 150,
            qtd_vendida: 20
        }

        add = store.add(product);

        product = {
            name: "DentalLife",
			photo: "/assets/purina.jpg",
            descricao: "Remedio para cachorros",
            preco: 39.99,
            qtd_estoque: 190,
            qtd_vendida: 10
        }

        add = store.add(product);

        product = {
            name: "Pedigree",
			photo: "/assets/racao.jpg",
            descricao: "Racao para cachorro",
            preco: 49.90,
            qtd_estoque: 25,
            qtd_vendida: 3
        }

        add = store.add(product);

        product = {
            name: "Urinary",
			photo: "/assets/royalcanin.jpg",
            descricao: "Nem ideia",
            preco: 19.90,
            qtd_estoque: 150,
            qtd_vendida: 89
        }

        add = store.add(product);

        product = {
            name: "Whiskas",
			photo: "/assets/whiskas.jpg",
            descricao: "Racao para gato",
            preco: 19.90,
            qtd_estoque: 100,
            qtd_vendida: 100
        }

        add = store.add(product);

        store = transaction.objectStore("Animais");


        var pet = {
                login: "Vitor",
                petName: "Nina",
                petPhoto: "/images/pets/nina.jpeg",
                race: "Lhasa",
                age: 2
        };

        add = store.add(pet);

        pet = {
                login: "Vitor",
                petName: "Cotinha",
                petPhoto: "/images/pets/cotinha.jpeg",
                race: "Vira-lata",
                age: 5
        };

        add = store.add(pet);

        pet = {
                login: "Vitor",
                petName: "Sheilinha",
                petPhoto: "/images/pets/sheilinha.jpeg",
                race: "Vira-lata",
                age: 4
        };

        add = store.add(pet);

        pet = {
                login: "Jorge",
                petPhoto: "/images/pets/yuki.jpg",
                petName: "Yuki",
                race: "Lhasa",
                age: 5
        };

        add = store.add(pet);

        pet = {
                login: "Raul",
                petPhoto: "/images/pets/wolfy.jpg",
                petName: "Wolfy",
                race: "Doguinho",
                age: 5
        };

        add = store.add(pet);

        console.log("BD atualizado");

        db.close();
    };
});
