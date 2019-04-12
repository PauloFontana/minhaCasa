package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.ClienteComprador;
import org.minhacasa.myapp.repository.ClienteCompradorRepository;
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
import java.math.BigDecimal;
import java.util.List;


import static org.minhacasa.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClienteCompradorResource REST controller.
 *
 * @see ClienteCompradorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class ClienteCompradorResourceIntTest {

    private static final BigDecimal DEFAULT_RENDA = new BigDecimal(1);
    private static final BigDecimal UPDATED_RENDA = new BigDecimal(2);

    private static final String DEFAULT_GARANTIAS = "AAAAAAAAAA";
    private static final String UPDATED_GARANTIAS = "BBBBBBBBBB";

    @Autowired
    private ClienteCompradorRepository clienteCompradorRepository;

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

    private MockMvc restClienteCompradorMockMvc;

    private ClienteComprador clienteComprador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClienteCompradorResource clienteCompradorResource = new ClienteCompradorResource(clienteCompradorRepository);
        this.restClienteCompradorMockMvc = MockMvcBuilders.standaloneSetup(clienteCompradorResource)
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
    public static ClienteComprador createEntity(EntityManager em) {
        ClienteComprador clienteComprador = new ClienteComprador()
            .renda(DEFAULT_RENDA)
            .garantias(DEFAULT_GARANTIAS);
        return clienteComprador;
    }

    @Before
    public void initTest() {
        clienteComprador = createEntity(em);
    }

    @Test
    @Transactional
    public void createClienteComprador() throws Exception {
        int databaseSizeBeforeCreate = clienteCompradorRepository.findAll().size();

        // Create the ClienteComprador
        restClienteCompradorMockMvc.perform(post("/api/cliente-compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clienteComprador)))
            .andExpect(status().isCreated());

        // Validate the ClienteComprador in the database
        List<ClienteComprador> clienteCompradorList = clienteCompradorRepository.findAll();
        assertThat(clienteCompradorList).hasSize(databaseSizeBeforeCreate + 1);
        ClienteComprador testClienteComprador = clienteCompradorList.get(clienteCompradorList.size() - 1);
        assertThat(testClienteComprador.getRenda()).isEqualTo(DEFAULT_RENDA);
        assertThat(testClienteComprador.getGarantias()).isEqualTo(DEFAULT_GARANTIAS);
    }

    @Test
    @Transactional
    public void createClienteCompradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clienteCompradorRepository.findAll().size();

        // Create the ClienteComprador with an existing ID
        clienteComprador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClienteCompradorMockMvc.perform(post("/api/cliente-compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clienteComprador)))
            .andExpect(status().isBadRequest());

        // Validate the ClienteComprador in the database
        List<ClienteComprador> clienteCompradorList = clienteCompradorRepository.findAll();
        assertThat(clienteCompradorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClienteCompradors() throws Exception {
        // Initialize the database
        clienteCompradorRepository.saveAndFlush(clienteComprador);

        // Get all the clienteCompradorList
        restClienteCompradorMockMvc.perform(get("/api/cliente-compradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clienteComprador.getId().intValue())))
            .andExpect(jsonPath("$.[*].renda").value(hasItem(DEFAULT_RENDA.intValue())))
            .andExpect(jsonPath("$.[*].garantias").value(hasItem(DEFAULT_GARANTIAS.toString())));
    }
    
    @Test
    @Transactional
    public void getClienteComprador() throws Exception {
        // Initialize the database
        clienteCompradorRepository.saveAndFlush(clienteComprador);

        // Get the clienteComprador
        restClienteCompradorMockMvc.perform(get("/api/cliente-compradors/{id}", clienteComprador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clienteComprador.getId().intValue()))
            .andExpect(jsonPath("$.renda").value(DEFAULT_RENDA.intValue()))
            .andExpect(jsonPath("$.garantias").value(DEFAULT_GARANTIAS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClienteComprador() throws Exception {
        // Get the clienteComprador
        restClienteCompradorMockMvc.perform(get("/api/cliente-compradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClienteComprador() throws Exception {
        // Initialize the database
        clienteCompradorRepository.saveAndFlush(clienteComprador);

        int databaseSizeBeforeUpdate = clienteCompradorRepository.findAll().size();

        // Update the clienteComprador
        ClienteComprador updatedClienteComprador = clienteCompradorRepository.findById(clienteComprador.getId()).get();
        // Disconnect from session so that the updates on updatedClienteComprador are not directly saved in db
        em.detach(updatedClienteComprador);
        updatedClienteComprador
            .renda(UPDATED_RENDA)
            .garantias(UPDATED_GARANTIAS);

        restClienteCompradorMockMvc.perform(put("/api/cliente-compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClienteComprador)))
            .andExpect(status().isOk());

        // Validate the ClienteComprador in the database
        List<ClienteComprador> clienteCompradorList = clienteCompradorRepository.findAll();
        assertThat(clienteCompradorList).hasSize(databaseSizeBeforeUpdate);
        ClienteComprador testClienteComprador = clienteCompradorList.get(clienteCompradorList.size() - 1);
        assertThat(testClienteComprador.getRenda()).isEqualTo(UPDATED_RENDA);
        assertThat(testClienteComprador.getGarantias()).isEqualTo(UPDATED_GARANTIAS);
    }

    @Test
    @Transactional
    public void updateNonExistingClienteComprador() throws Exception {
        int databaseSizeBeforeUpdate = clienteCompradorRepository.findAll().size();

        // Create the ClienteComprador

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteCompradorMockMvc.perform(put("/api/cliente-compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clienteComprador)))
            .andExpect(status().isBadRequest());

        // Validate the ClienteComprador in the database
        List<ClienteComprador> clienteCompradorList = clienteCompradorRepository.findAll();
        assertThat(clienteCompradorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClienteComprador() throws Exception {
        // Initialize the database
        clienteCompradorRepository.saveAndFlush(clienteComprador);

        int databaseSizeBeforeDelete = clienteCompradorRepository.findAll().size();

        // Delete the clienteComprador
        restClienteCompradorMockMvc.perform(delete("/api/cliente-compradors/{id}", clienteComprador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClienteComprador> clienteCompradorList = clienteCompradorRepository.findAll();
        assertThat(clienteCompradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClienteComprador.class);
        ClienteComprador clienteComprador1 = new ClienteComprador();
        clienteComprador1.setId(1L);
        ClienteComprador clienteComprador2 = new ClienteComprador();
        clienteComprador2.setId(clienteComprador1.getId());
        assertThat(clienteComprador1).isEqualTo(clienteComprador2);
        clienteComprador2.setId(2L);
        assertThat(clienteComprador1).isNotEqualTo(clienteComprador2);
        clienteComprador1.setId(null);
        assertThat(clienteComprador1).isNotEqualTo(clienteComprador2);
    }
}
