package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Proprietario;
import org.minhacasa.myapp.repository.ProprietarioRepository;
import org.minhacasa.myapp.service.ProprietarioService;
import org.minhacasa.myapp.service.dto.ProprietarioDTO;
import org.minhacasa.myapp.service.mapper.ProprietarioMapper;
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
 * Test class for the ProprietarioResource REST controller.
 *
 * @see ProprietarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class ProprietarioResourceIntTest {

    private static final String DEFAULT_CONTA_CORRENTE = "AAAAAAAAAA";
    private static final String UPDATED_CONTA_CORRENTE = "BBBBBBBBBB";

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private ProprietarioMapper proprietarioMapper;

    @Autowired
    private ProprietarioService proprietarioService;

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

    private MockMvc restProprietarioMockMvc;

    private Proprietario proprietario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProprietarioResource proprietarioResource = new ProprietarioResource(proprietarioService);
        this.restProprietarioMockMvc = MockMvcBuilders.standaloneSetup(proprietarioResource)
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
    public static Proprietario createEntity(EntityManager em) {
        Proprietario proprietario = new Proprietario()
            .contaCorrente(DEFAULT_CONTA_CORRENTE);
        return proprietario;
    }

    @Before
    public void initTest() {
        proprietario = createEntity(em);
    }

    @Test
    @Transactional
    public void createProprietario() throws Exception {
        int databaseSizeBeforeCreate = proprietarioRepository.findAll().size();

        // Create the Proprietario
        ProprietarioDTO proprietarioDTO = proprietarioMapper.toDto(proprietario);
        restProprietarioMockMvc.perform(post("/api/proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proprietarioDTO)))
            .andExpect(status().isCreated());

        // Validate the Proprietario in the database
        List<Proprietario> proprietarioList = proprietarioRepository.findAll();
        assertThat(proprietarioList).hasSize(databaseSizeBeforeCreate + 1);
        Proprietario testProprietario = proprietarioList.get(proprietarioList.size() - 1);
        assertThat(testProprietario.getContaCorrente()).isEqualTo(DEFAULT_CONTA_CORRENTE);
    }

    @Test
    @Transactional
    public void createProprietarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proprietarioRepository.findAll().size();

        // Create the Proprietario with an existing ID
        proprietario.setId(1L);
        ProprietarioDTO proprietarioDTO = proprietarioMapper.toDto(proprietario);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProprietarioMockMvc.perform(post("/api/proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proprietarioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Proprietario in the database
        List<Proprietario> proprietarioList = proprietarioRepository.findAll();
        assertThat(proprietarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkContaCorrenteIsRequired() throws Exception {
        int databaseSizeBeforeTest = proprietarioRepository.findAll().size();
        // set the field null
        proprietario.setContaCorrente(null);

        // Create the Proprietario, which fails.
        ProprietarioDTO proprietarioDTO = proprietarioMapper.toDto(proprietario);

        restProprietarioMockMvc.perform(post("/api/proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proprietarioDTO)))
            .andExpect(status().isBadRequest());

        List<Proprietario> proprietarioList = proprietarioRepository.findAll();
        assertThat(proprietarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProprietarios() throws Exception {
        // Initialize the database
        proprietarioRepository.saveAndFlush(proprietario);

        // Get all the proprietarioList
        restProprietarioMockMvc.perform(get("/api/proprietarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proprietario.getId().intValue())))
            .andExpect(jsonPath("$.[*].contaCorrente").value(hasItem(DEFAULT_CONTA_CORRENTE.toString())));
    }
    
    @Test
    @Transactional
    public void getProprietario() throws Exception {
        // Initialize the database
        proprietarioRepository.saveAndFlush(proprietario);

        // Get the proprietario
        restProprietarioMockMvc.perform(get("/api/proprietarios/{id}", proprietario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proprietario.getId().intValue()))
            .andExpect(jsonPath("$.contaCorrente").value(DEFAULT_CONTA_CORRENTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProprietario() throws Exception {
        // Get the proprietario
        restProprietarioMockMvc.perform(get("/api/proprietarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProprietario() throws Exception {
        // Initialize the database
        proprietarioRepository.saveAndFlush(proprietario);

        int databaseSizeBeforeUpdate = proprietarioRepository.findAll().size();

        // Update the proprietario
        Proprietario updatedProprietario = proprietarioRepository.findById(proprietario.getId()).get();
        // Disconnect from session so that the updates on updatedProprietario are not directly saved in db
        em.detach(updatedProprietario);
        updatedProprietario
            .contaCorrente(UPDATED_CONTA_CORRENTE);
        ProprietarioDTO proprietarioDTO = proprietarioMapper.toDto(updatedProprietario);

        restProprietarioMockMvc.perform(put("/api/proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proprietarioDTO)))
            .andExpect(status().isOk());

        // Validate the Proprietario in the database
        List<Proprietario> proprietarioList = proprietarioRepository.findAll();
        assertThat(proprietarioList).hasSize(databaseSizeBeforeUpdate);
        Proprietario testProprietario = proprietarioList.get(proprietarioList.size() - 1);
        assertThat(testProprietario.getContaCorrente()).isEqualTo(UPDATED_CONTA_CORRENTE);
    }

    @Test
    @Transactional
    public void updateNonExistingProprietario() throws Exception {
        int databaseSizeBeforeUpdate = proprietarioRepository.findAll().size();

        // Create the Proprietario
        ProprietarioDTO proprietarioDTO = proprietarioMapper.toDto(proprietario);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProprietarioMockMvc.perform(put("/api/proprietarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proprietarioDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Proprietario in the database
        List<Proprietario> proprietarioList = proprietarioRepository.findAll();
        assertThat(proprietarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProprietario() throws Exception {
        // Initialize the database
        proprietarioRepository.saveAndFlush(proprietario);

        int databaseSizeBeforeDelete = proprietarioRepository.findAll().size();

        // Delete the proprietario
        restProprietarioMockMvc.perform(delete("/api/proprietarios/{id}", proprietario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Proprietario> proprietarioList = proprietarioRepository.findAll();
        assertThat(proprietarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proprietario.class);
        Proprietario proprietario1 = new Proprietario();
        proprietario1.setId(1L);
        Proprietario proprietario2 = new Proprietario();
        proprietario2.setId(proprietario1.getId());
        assertThat(proprietario1).isEqualTo(proprietario2);
        proprietario2.setId(2L);
        assertThat(proprietario1).isNotEqualTo(proprietario2);
        proprietario1.setId(null);
        assertThat(proprietario1).isNotEqualTo(proprietario2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProprietarioDTO.class);
        ProprietarioDTO proprietarioDTO1 = new ProprietarioDTO();
        proprietarioDTO1.setId(1L);
        ProprietarioDTO proprietarioDTO2 = new ProprietarioDTO();
        assertThat(proprietarioDTO1).isNotEqualTo(proprietarioDTO2);
        proprietarioDTO2.setId(proprietarioDTO1.getId());
        assertThat(proprietarioDTO1).isEqualTo(proprietarioDTO2);
        proprietarioDTO2.setId(2L);
        assertThat(proprietarioDTO1).isNotEqualTo(proprietarioDTO2);
        proprietarioDTO1.setId(null);
        assertThat(proprietarioDTO1).isNotEqualTo(proprietarioDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(proprietarioMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(proprietarioMapper.fromId(null)).isNull();
    }
}
