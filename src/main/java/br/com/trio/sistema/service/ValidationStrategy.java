package br.com.trio.sistema.service;

public interface ValidationStrategy<T> {
    void validar(T entidade);
}
