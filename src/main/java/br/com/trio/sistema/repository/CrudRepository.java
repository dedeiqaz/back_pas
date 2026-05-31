package br.com.trio.sistema.repository;

import br.com.trio.sistema.model.Entidade;
import java.util.List;
import java.util.Optional;

public interface CrudRepository<T extends Entidade> {
    T save(T entidade);
    List<T> findAll();
    Optional<T> findById(Long id);
    void deleteById(Long id);
}
