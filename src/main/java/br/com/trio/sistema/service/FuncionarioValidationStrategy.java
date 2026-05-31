package br.com.trio.sistema.service;

import br.com.trio.sistema.model.Funcionario;
import org.springframework.stereotype.Component;

@Component
public class FuncionarioValidationStrategy implements ValidationStrategy<Funcionario> {

    @Override
    public void validar(Funcionario funcionario) {
        if (funcionario.getNome() == null || funcionario.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do funcionário é obrigatório.");
        }
        if (funcionario.getCargo() == null || funcionario.getCargo().isBlank()) {
            throw new IllegalArgumentException("Cargo é obrigatório.");
        }
        if (funcionario.getSalario() == null || funcionario.getSalario() <= 0) {
            throw new IllegalArgumentException("Salário deve ser maior que zero.");
        }
    }
}
