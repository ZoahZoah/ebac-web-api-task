let getElement = (id) => document.getElementById(id);
const listIds = [
        "nome",
        "email",
        "cep",
        "rua",
        "numero",
        "bairro",
        "cidade",
        "estado"
    ];

getElement("cep").addEventListener("blur", (event) => {
	let cepElement = event.target;
	let cep = cepElement.value.replace(/\D/g, "");
	let cepIsValid = isNaN(parseInt(cep)) === false && cep.length === 8;

	if (!cepIsValid) {
		console.log("CEP inválido");
		return;
	} else {
		fetch(`https://viacep.com.br/ws/${cep}/json/`)
			.then((response) => response.json())
			.then((data) => {
				if (!data || data.erro) {
					throw new Error("CEP não encontrado");
				} else {
					getElement("cep").value = data.cep;
					getElement("rua").value = data.logradouro;
					getElement("bairro").value = data.bairro;
					getElement("cidade").value = data.localidade;
					getElement("estado").value = data.estado;
				}
			})
			.catch((error) => {
				console.error("Erro ao buscar o CEP:", error);
			});
	}
});

getElement("formSignUp").addEventListener("submit", (event) => {
    event.preventDefault();
    
    
    listIds.forEach((id) => sessionStorage.setItem(id, getElement(id).value));
    listIds.forEach((id) => console.log(`${id}: ${sessionStorage.getItem(id)}`));
});

document.addEventListener("DOMContentLoaded", () => {
    listIds.forEach((id) => getElement(id).value = sessionStorage.getItem(id));
})