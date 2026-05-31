package br.com.trio.sistema.service;

import br.com.trio.sistema.model.Entidade;
import br.com.trio.sistema.repository.CrudRepository;
import java.util.List;

public class CadastroService<T extends Entidade> {

    private final CrudRepository<T> repository;
    private final ValidationStrategy<T> validationStrategy;

    public CadastroService(CrudRepository<T> repository, ValidationStrategy<T> validationStrategy) {
        this.repository = repository;
        this.validationStrategy = validationStrategy;
    }

    public List<T> listarTodos() {
        return repository.findAll();
    }

    public T buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Registro não encontrado."));
    }

    public T salvar(T entidade) {
        validationStrategy.validar(entidade);
        return repository.save(entidade);
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
