package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Corretor;
import org.minhacasa.myapp.repository.CorretorRepository;
import org.minhacasa.myapp.service.CorretorService;
import org.minhacasa.myapp.service.dto.CorretorDTO;
import org.minhacasa.myapp.service.mapper.CorretorMapper;
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
 * Test class for the CorretorResource REST controller.
 *
 * @see CorretorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class CorretorResourceIntTest {

    private static final String DEFAULT_REGISTRO_IMOBILIARIA = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRO_IMOBILIARIA = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_CRECI = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CRECI = "BBBBBBBBBB";

    private static final String DEFAULT_CONTA_CORRENTE = "AAAAAAAAAA";
    private static final String UPDATED_CONTA_CORRENTE = "BBBBBBBBBB";

    @Autowired
    private CorretorRepository corretorRepository;

    @Autowired
    private CorretorMapper corretorMapper;

    @Autowired
    private CorretorService corretorService;

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

    private MockMvc restCorretorMockMvc;

    private Corretor corretor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CorretorResource corretorResource = new CorretorResource(corretorService);
        this.restCorretorMockMvc = MockMvcBuilders.standaloneSetup(corretorResource)
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
    public static Corretor createEntity(EntityManager em) {
        Corretor corretor = new Corretor()
            .registroImobiliaria(DEFAULT_REGISTRO_IMOBILIARIA)
            .password(DEFAULT_PASSWORD)
            .numeroCreci(DEFAULT_NUMERO_CRECI)
            .contaCorrente(DEFAULT_CONTA_CORRENTE);
        return corretor;
    }

    @Before
    public void initTest() {
        corretor = createEntity(em);
    }

    @Test
    @Transactional
    public void createCorretor() throws Exception {
        int databaseSizeBeforeCreate = corretorRepository.findAll().size();

        // Create the Corretor
        CorretorDTO corretorDTO = corretorMapper.toDto(corretor);
        restCorretorMockMvc.perform(post("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isCreated());

        // Validate the Corretor in the database
        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeCreate + 1);
        Corretor testCorretor = corretorList.get(corretorList.size() - 1);
        assertThat(testCorretor.getRegistroImobiliaria()).isEqualTo(DEFAULT_REGISTRO_IMOBILIARIA);
        assertThat(testCorretor.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testCorretor.getNumeroCreci()).isEqualTo(DEFAULT_NUMERO_CRECI);
        assertThat(testCorretor.getContaCorrente()).isEqualTo(DEFAULT_CONTA_CORRENTE);
    }

    @Test
    @Transactional
    public void createCorretorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = corretorRepository.findAll().size();

        // Create the Corretor with an existing ID
        corretor.setId(1L);
        CorretorDTO corretorDTO = corretorMapper.toDto(corretor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCorretorMockMvc.perform(post("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Corretor in the database
        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkRegistroImobiliariaIsRequired() throws Exception {
        int databaseSizeBeforeTest = corretorRepository.findAll().size();
        // set the field null
        corretor.setRegistroImobiliaria(null);

        // Create the Corretor, which fails.
        CorretorDTO corretorDTO = corretorMapper.toDto(corretor);

        restCorretorMockMvc.perform(post("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isBadRequest());

        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = corretorRepository.findAll().size();
        // set the field null
        corretor.setPassword(null);

        // Create the Corretor, which fails.
        CorretorDTO corretorDTO = corretorMapper.toDto(corretor);

        restCorretorMockMvc.perform(post("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isBadRequest());

        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroCreciIsRequired() throws Exception {
        int databaseSizeBeforeTest = corretorRepository.findAll().size();
        // set the field null
        corretor.setNumeroCreci(null);

        // Create the Corretor, which fails.
        CorretorDTO corretorDTO = corretorMapper.toDto(corretor);

        restCorretorMockMvc.perform(post("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isBadRequest());

        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCorretors() throws Exception {
        // Initialize the database
        corretorRepository.saveAndFlush(corretor);

        // Get all the corretorList
        restCorretorMockMvc.perform(get("/api/corretors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(corretor.getId().intValue())))
            .andExpect(jsonPath("$.[*].registroImobiliaria").value(hasItem(DEFAULT_REGISTRO_IMOBILIARIA.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].numeroCreci").value(hasItem(DEFAULT_NUMERO_CRECI.toString())))
            .andExpect(jsonPath("$.[*].contaCorrente").value(hasItem(DEFAULT_CONTA_CORRENTE.toString())));
    }
    
    @Test
    @Transactional
    public void getCorretor() throws Exception {
        // Initialize the database
        corretorRepository.saveAndFlush(corretor);

        // Get the corretor
        restCorretorMockMvc.perform(get("/api/corretors/{id}", corretor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(corretor.getId().intValue()))
            .andExpect(jsonPath("$.registroImobiliaria").value(DEFAULT_REGISTRO_IMOBILIARIA.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.numeroCreci").value(DEFAULT_NUMERO_CRECI.toString()))
            .andExpect(jsonPath("$.contaCorrente").value(DEFAULT_CONTA_CORRENTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCorretor() throws Exception {
        // Get the corretor
        restCorretorMockMvc.perform(get("/api/corretors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCorretor() throws Exception {
        // Initialize the database
        corretorRepository.saveAndFlush(corretor);

        int databaseSizeBeforeUpdate = corretorRepository.findAll().size();

        // Update the corretor
        Corretor updatedCorretor = corretorRepository.findById(corretor.getId()).get();
        // Disconnect from session so that the updates on updatedCorretor are not directly saved in db
        em.detach(updatedCorretor);
        updatedCorretor
            .registroImobiliaria(UPDATED_REGISTRO_IMOBILIARIA)
            .password(UPDATED_PASSWORD)
            .numeroCreci(UPDATED_NUMERO_CRECI)
            .contaCorrente(UPDATED_CONTA_CORRENTE);
        CorretorDTO corretorDTO = corretorMapper.toDto(updatedCorretor);

        restCorretorMockMvc.perform(put("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isOk());

        // Validate the Corretor in the database
        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeUpdate);
        Corretor testCorretor = corretorList.get(corretorList.size() - 1);
        assertThat(testCorretor.getRegistroImobiliaria()).isEqualTo(UPDATED_REGISTRO_IMOBILIARIA);
        assertThat(testCorretor.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testCorretor.getNumeroCreci()).isEqualTo(UPDATED_NUMERO_CRECI);
        assertThat(testCorretor.getContaCorrente()).isEqualTo(UPDATED_CONTA_CORRENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingCorretor() throws Exception {
        int databaseSizeBeforeUpdate = corretorRepository.findAll().size();

        // Create the Corretor
        CorretorDTO corretorDTO = corretorMapper.toDto(corretor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCorretorMockMvc.perform(put("/api/corretors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corretorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Corretor in the database
        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCorretor() throws Exception {
        // Initialize the database
        corretorRepository.saveAndFlush(corretor);

        int databaseSizeBeforeDelete = corretorRepository.findAll().size();

        // Delete the corretor
        restCorretorMockMvc.perform(delete("/api/corretors/{id}", corretor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Corretor> corretorList = corretorRepository.findAll();
        assertThat(corretorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Corretor.class);
        Corretor corretor1 = new Corretor();
        corretor1.setId(1L);
        Corretor corretor2 = new Corretor();
        corretor2.setId(corretor1.getId());
        assertThat(corretor1).isEqualTo(corretor2);
        corretor2.setId(2L);
        assertThat(corretor1).isNotEqualTo(corretor2);
        corretor1.setId(null);
        assertThat(corretor1).isNotEqualTo(corretor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CorretorDTO.class);
        CorretorDTO corretorDTO1 = new CorretorDTO();
        corretorDTO1.setId(1L);
        CorretorDTO corretorDTO2 = new CorretorDTO();
        assertThat(corretorDTO1).isNotEqualTo(corretorDTO2);
        corretorDTO2.setId(corretorDTO1.getId());
        assertThat(corretorDTO1).isEqualTo(corretorDTO2);
        corretorDTO2.setId(2L);
        assertThat(corretorDTO1).isNotEqualTo(corretorDTO2);
        corretorDTO1.setId(null);
        assertThat(corretorDTO1).isNotEqualTo(corretorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(corretorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(corretorMapper.fromId(null)).isNull();
    }
}
