package br.com.trio.sistema.service;

import br.com.trio.sistema.model.Produto;
import org.springframework.stereotype.Component;

@Component
public class ProdutoValidationStrategy implements ValidationStrategy<Produto> {

    @Override
    public void validar(Produto produto) {
        if (produto.getNome() == null || produto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do produto é obrigatório.");
        }
        if (produto.getPreco() == null || produto.getPreco() <= 0) {
            throw new IllegalArgumentException("Preço deve ser maior que zero.");
        }
        if (produto.getEstoque() == null || produto.getEstoque() < 0) {
            throw new IllegalArgumentException("Estoque não pode ser negativo.");
        }
    }
}
