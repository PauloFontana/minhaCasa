package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.ClienteProprietario;
import org.minhacasa.myapp.repository.ClienteProprietarioRepository;
import org.minhacasa.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static org.minhacasa.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClienteProprietarioResource REST controller.
 *
 * @see ClienteProprietarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class ClienteProprietarioResourceIntTest {

    private static final String DEFAULT_CONTA_CORRENTE = "AAAAAAAAAA";
    private static final String UPDATED_CONTA_CORRENTE = "BBBBBBBBBB";

    @Autowired
    private ClienteProprietarioRepository clienteProprietarioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restClienteProprietarioMockMvc;

    private ClienteProprietario clienteProprietario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClienteProprietarioResource clienteProprietarioResource = new ClienteProprietarioResource(clienteProprietarioRepository);
        this.restClienteProprietarioMockMvc = MockMvcBuilders.standaloneSetup(clienteProprietarioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClienteProprietario createEntity(EntityManager em) {
        ClienteProprietario clienteProprietario = new ClienteProprietario()
            .contaCorrente(DEFAULT_CONTA_CORRENTE);
        return clienteProprietario;
    }

    @Before
    public void initTest() {
        clienteProprietario = createEntity(em);
    }

    @Test
    @Transactional
    public void createClienteProprietario() throws Exception {
        int databaseSizeBeforeCreate = clienteProprietarioRepository.findAll().size();

        // Create the ClienteProprietario
        restClienteProprietarioMockMvc.perform(post("/api/cliente-proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clienteProprietario)))
            .andExpect(status().isCreated());

        // Validate the ClienteProprietario in the database
        List<ClienteProprietario> clienteProprietarioList = clienteProprietarioRepository.findAll();
        assertThat(clienteProprietarioList).hasSize(databaseSizeBeforeCreate + 1);
        ClienteProprietario testClienteProprietario = clienteProprietarioList.get(clienteProprietarioList.size() - 1);
        assertThat(testClienteProprietario.getContaCorrente()).isEqualTo(DEFAULT_CONTA_CORRENTE);
    }

    @Test
    @Transactional
    public void createClienteProprietarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clienteProprietarioRepository.findAll().size();

        // Create the ClienteProprietario with an existing ID
        clienteProprietario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClienteProprietarioMockMvc.perform(post("/api/cliente-proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clienteProprietario)))
            .andExpect(status().isBadRequest());

        // Validate the ClienteProprietario in the database
        List<ClienteProprietario> clienteProprietarioList = clienteProprietarioRepository.findAll();
        assertThat(clienteProprietarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClienteProprietarios() throws Exception {
        // Initialize the database
        clienteProprietarioRepository.saveAndFlush(clienteProprietario);

        // Get all the clienteProprietarioList
        restClienteProprietarioMockMvc.perform(get("/api/cliente-proprietarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clienteProprietario.getId().intValue())))
            .andExpect(jsonPath("$.[*].contaCorrente").value(hasItem(DEFAULT_CONTA_CORRENTE.toString())));
    }
    
    @Test
    @Transactional
    public void getClienteProprietario() throws Exception {
        // Initialize the database
        clienteProprietarioRepository.saveAndFlush(clienteProprietario);

        // Get the clienteProprietario
        restClienteProprietarioMockMvc.perform(get("/api/cliente-proprietarios/{id}", clienteProprietario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clienteProprietario.getId().intValue()))
            .andExpect(jsonPath("$.contaCorrente").value(DEFAULT_CONTA_CORRENTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClienteProprietario() throws Exception {
        // Get the clienteProprietario
        restClienteProprietarioMockMvc.perform(get("/api/cliente-proprietarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClienteProprietario() throws Exception {
        // Initialize the database
        clienteProprietarioRepository.saveAndFlush(clienteProprietario);

        int databaseSizeBeforeUpdate = clienteProprietarioRepository.findAll().size();

        // Update the clienteProprietario
        ClienteProprietario updatedClienteProprietario = clienteProprietarioRepository.findById(clienteProprietario.getId()).get();
        // Disconnect from session so that the updates on updatedClienteProprietario are not directly saved in db
        em.detach(updatedClienteProprietario);
        updatedClienteProprietario
            .contaCorrente(UPDATED_CONTA_CORRENTE);

        restClienteProprietarioMockMvc.perform(put("/api/cliente-proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClienteProprietario)))
            .andExpect(status().isOk());

        // Validate the ClienteProprietario in the database
        List<ClienteProprietario> clienteProprietarioList = clienteProprietarioRepository.findAll();
        assertThat(clienteProprietarioList).hasSize(databaseSizeBeforeUpdate);
        ClienteProprietario testClienteProprietario = clienteProprietarioList.get(clienteProprietarioList.size() - 1);
        assertThat(testClienteProprietario.getContaCorrente()).isEqualTo(UPDATED_CONTA_CORRENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingClienteProprietario() throws Exception {
        int databaseSizeBeforeUpdate = clienteProprietarioRepository.findAll().size();

        // Create the ClienteProprietario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteProprietarioMockMvc.perform(put("/api/cliente-proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clienteProprietario)))
            .andExpect(status().isBadRequest());

        // Validate the ClienteProprietario in the database
        List<ClienteProprietario> clienteProprietarioList = clienteProprietarioRepository.findAll();
        assertThat(clienteProprietarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClienteProprietario() throws Exception {
        // Initialize the database
        clienteProprietarioRepository.saveAndFlush(clienteProprietario);

        int databaseSizeBeforeDelete = clienteProprietarioRepository.findAll().size();

        // Delete the clienteProprietario
        restClienteProprietarioMockMvc.perform(delete("/api/cliente-proprietarios/{id}", clienteProprietario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClienteProprietario> clienteProprietarioList = clienteProprietarioRepository.findAll();
        assertThat(clienteProprietarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClienteProprietario.class);
        ClienteProprietario clienteProprietario1 = new ClienteProprietario();
        clienteProprietario1.setId(1L);
        ClienteProprietario clienteProprietario2 = new ClienteProprietario();
        clienteProprietario2.setId(clienteProprietario1.getId());
        assertThat(clienteProprietario1).isEqualTo(clienteProprietario2);
        clienteProprietario2.setId(2L);
        assertThat(clienteProprietario1).isNotEqualTo(clienteProprietario2);
        clienteProprietario1.setId(null);
        assertThat(clienteProprietario1).isNotEqualTo(clienteProprietario2);
    }
}
