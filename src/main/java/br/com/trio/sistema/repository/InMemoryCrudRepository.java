package br.com.trio.sistema.repository;

import br.com.trio.sistema.model.Entidade;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class InMemoryCrudRepository<T extends Entidade> implements CrudRepository<T> {

    private final ConcurrentHashMap<Long, T> banco = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    @Override
    public T save(T entidade) {
        if (entidade.getId() == null) {
            entidade.setId(sequence.incrementAndGet());
        }
        banco.put(entidade.getId(), entidade);
        return entidade;
    }

    @Override
    public List<T> findAll() {
        return new ArrayList<>(banco.values());
    }

    @Override
    public Optional<T> findById(Long id) {
        return Optional.ofNullable(banco.get(id));
    }

    @Override
    public void deleteById(Long id) {
        banco.remove(id);
    }
}
