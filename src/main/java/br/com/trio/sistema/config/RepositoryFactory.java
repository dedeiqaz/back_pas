package br.com.trio.sistema.config;

import br.com.trio.sistema.model.Entidade;
import br.com.trio.sistema.repository.CrudRepository;
import br.com.trio.sistema.repository.InMemoryCrudRepository;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RepositoryFactory {

    private static final RepositoryFactory INSTANCE = new RepositoryFactory();
    private final Map<Class<?>, CrudRepository<?>> repositories = new ConcurrentHashMap<>();

    private RepositoryFactory() {
    }

    public static RepositoryFactory getInstance() {
        return INSTANCE;
    }

    @SuppressWarnings("unchecked")
    public <T extends Entidade> CrudRepository<T> createRepository(Class<T> tipo) {
        return (CrudRepository<T>) repositories.computeIfAbsent(tipo, key -> new InMemoryCrudRepository<>());
    }
}
