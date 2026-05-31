package br.com.trio.sistema.service;

import br.com.trio.sistema.model.Cliente;
import org.springframework.stereotype.Component;

@Component
public class ClienteValidationStrategy implements ValidationStrategy<Cliente> {

    @Override
    public void validar(Cliente cliente) {
        if (cliente.getNome() == null || cliente.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do cliente é obrigatório.");
        }
        if (cliente.getEmail() == null || !cliente.getEmail().contains("@")) {
            throw new IllegalArgumentException("E-mail inválido.");
        }
        if (cliente.getTelefone() == null || cliente.getTelefone().isBlank()) {
            throw new IllegalArgumentException("Telefone é obrigatório.");
        }
    }
}
