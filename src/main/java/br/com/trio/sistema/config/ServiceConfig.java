package br.com.trio.sistema.config;

import br.com.trio.sistema.model.Cliente;
import br.com.trio.sistema.model.Funcionario;
import br.com.trio.sistema.model.Produto;
import br.com.trio.sistema.service.CadastroService;
import br.com.trio.sistema.service.ClienteValidationStrategy;
import br.com.trio.sistema.service.FuncionarioValidationStrategy;
import br.com.trio.sistema.service.ProdutoValidationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {

    @Bean
    public CadastroService<Produto> produtoService(ProdutoValidationStrategy strategy) {
        return new CadastroService<>(
                RepositoryFactory.getInstance().createRepository(Produto.class),
                strategy
        );
    }

    @Bean
    public CadastroService<Cliente> clienteService(ClienteValidationStrategy strategy) {
        return new CadastroService<>(
                RepositoryFactory.getInstance().createRepository(Cliente.class),
                strategy
        );
    }

    @Bean
    public CadastroService<Funcionario> funcionarioService(FuncionarioValidationStrategy strategy) {
        return new CadastroService<>(
                RepositoryFactory.getInstance().createRepository(Funcionario.class),
                strategy
        );
    }
}
