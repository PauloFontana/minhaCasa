package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Imobiliaria;
import org.minhacasa.myapp.repository.ImobiliariaRepository;
import org.minhacasa.myapp.service.ImobiliariaService;
import org.minhacasa.myapp.service.dto.ImobiliariaDTO;
import org.minhacasa.myapp.service.mapper.ImobiliariaMapper;
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
 * Test class for the ImobiliariaResource REST controller.
 *
 * @see ImobiliariaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class ImobiliariaResourceIntTest {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ = "AAAAAAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    @Autowired
    private ImobiliariaRepository imobiliariaRepository;

    @Autowired
    private ImobiliariaMapper imobiliariaMapper;

    @Autowired
    private ImobiliariaService imobiliariaService;

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

    private MockMvc restImobiliariaMockMvc;

    private Imobiliaria imobiliaria;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImobiliariaResource imobiliariaResource = new ImobiliariaResource(imobiliariaService);
        this.restImobiliariaMockMvc = MockMvcBuilders.standaloneSetup(imobiliariaResource)
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
    public static Imobiliaria createEntity(EntityManager em) {
        Imobiliaria imobiliaria = new Imobiliaria()
            .login(DEFAULT_LOGIN)
            .password(DEFAULT_PASSWORD)
            .nome(DEFAULT_NOME)
            .cnpj(DEFAULT_CNPJ)
            .endereco(DEFAULT_ENDERECO)
            .telefone(DEFAULT_TELEFONE);
        return imobiliaria;
    }

    @Before
    public void initTest() {
        imobiliaria = createEntity(em);
    }

    @Test
    @Transactional
    public void createImobiliaria() throws Exception {
        int databaseSizeBeforeCreate = imobiliariaRepository.findAll().size();

        // Create the Imobiliaria
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);
        restImobiliariaMockMvc.perform(post("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isCreated());

        // Validate the Imobiliaria in the database
        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeCreate + 1);
        Imobiliaria testImobiliaria = imobiliariaList.get(imobiliariaList.size() - 1);
        assertThat(testImobiliaria.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testImobiliaria.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testImobiliaria.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testImobiliaria.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testImobiliaria.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testImobiliaria.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
    }

    @Test
    @Transactional
    public void createImobiliariaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imobiliariaRepository.findAll().size();

        // Create the Imobiliaria with an existing ID
        imobiliaria.setId(1L);
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImobiliariaMockMvc.perform(post("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Imobiliaria in the database
        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLoginIsRequired() throws Exception {
        int databaseSizeBeforeTest = imobiliariaRepository.findAll().size();
        // set the field null
        imobiliaria.setLogin(null);

        // Create the Imobiliaria, which fails.
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);

        restImobiliariaMockMvc.perform(post("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isBadRequest());

        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = imobiliariaRepository.findAll().size();
        // set the field null
        imobiliaria.setPassword(null);

        // Create the Imobiliaria, which fails.
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);

        restImobiliariaMockMvc.perform(post("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isBadRequest());

        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = imobiliariaRepository.findAll().size();
        // set the field null
        imobiliaria.setNome(null);

        // Create the Imobiliaria, which fails.
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);

        restImobiliariaMockMvc.perform(post("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isBadRequest());

        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCnpjIsRequired() throws Exception {
        int databaseSizeBeforeTest = imobiliariaRepository.findAll().size();
        // set the field null
        imobiliaria.setCnpj(null);

        // Create the Imobiliaria, which fails.
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);

        restImobiliariaMockMvc.perform(post("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isBadRequest());

        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllImobiliarias() throws Exception {
        // Initialize the database
        imobiliariaRepository.saveAndFlush(imobiliaria);

        // Get all the imobiliariaList
        restImobiliariaMockMvc.perform(get("/api/imobiliarias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imobiliaria.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())));
    }
    
    @Test
    @Transactional
    public void getImobiliaria() throws Exception {
        // Initialize the database
        imobiliariaRepository.saveAndFlush(imobiliaria);

        // Get the imobiliaria
        restImobiliariaMockMvc.perform(get("/api/imobiliarias/{id}", imobiliaria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imobiliaria.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ.toString()))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImobiliaria() throws Exception {
        // Get the imobiliaria
        restImobiliariaMockMvc.perform(get("/api/imobiliarias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImobiliaria() throws Exception {
        // Initialize the database
        imobiliariaRepository.saveAndFlush(imobiliaria);

        int databaseSizeBeforeUpdate = imobiliariaRepository.findAll().size();

        // Update the imobiliaria
        Imobiliaria updatedImobiliaria = imobiliariaRepository.findById(imobiliaria.getId()).get();
        // Disconnect from session so that the updates on updatedImobiliaria are not directly saved in db
        em.detach(updatedImobiliaria);
        updatedImobiliaria
            .login(UPDATED_LOGIN)
            .password(UPDATED_PASSWORD)
            .nome(UPDATED_NOME)
            .cnpj(UPDATED_CNPJ)
            .endereco(UPDATED_ENDERECO)
            .telefone(UPDATED_TELEFONE);
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(updatedImobiliaria);

        restImobiliariaMockMvc.perform(put("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isOk());

        // Validate the Imobiliaria in the database
        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeUpdate);
        Imobiliaria testImobiliaria = imobiliariaList.get(imobiliariaList.size() - 1);
        assertThat(testImobiliaria.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testImobiliaria.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testImobiliaria.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testImobiliaria.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testImobiliaria.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testImobiliaria.getTelefone()).isEqualTo(UPDATED_TELEFONE);
    }

    @Test
    @Transactional
    public void updateNonExistingImobiliaria() throws Exception {
        int databaseSizeBeforeUpdate = imobiliariaRepository.findAll().size();

        // Create the Imobiliaria
        ImobiliariaDTO imobiliariaDTO = imobiliariaMapper.toDto(imobiliaria);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImobiliariaMockMvc.perform(put("/api/imobiliarias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imobiliariaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Imobiliaria in the database
        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImobiliaria() throws Exception {
        // Initialize the database
        imobiliariaRepository.saveAndFlush(imobiliaria);

        int databaseSizeBeforeDelete = imobiliariaRepository.findAll().size();

        // Delete the imobiliaria
        restImobiliariaMockMvc.perform(delete("/api/imobiliarias/{id}", imobiliaria.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Imobiliaria> imobiliariaList = imobiliariaRepository.findAll();
        assertThat(imobiliariaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imobiliaria.class);
        Imobiliaria imobiliaria1 = new Imobiliaria();
        imobiliaria1.setId(1L);
        Imobiliaria imobiliaria2 = new Imobiliaria();
        imobiliaria2.setId(imobiliaria1.getId());
        assertThat(imobiliaria1).isEqualTo(imobiliaria2);
        imobiliaria2.setId(2L);
        assertThat(imobiliaria1).isNotEqualTo(imobiliaria2);
        imobiliaria1.setId(null);
        assertThat(imobiliaria1).isNotEqualTo(imobiliaria2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImobiliariaDTO.class);
        ImobiliariaDTO imobiliariaDTO1 = new ImobiliariaDTO();
        imobiliariaDTO1.setId(1L);
        ImobiliariaDTO imobiliariaDTO2 = new ImobiliariaDTO();
        assertThat(imobiliariaDTO1).isNotEqualTo(imobiliariaDTO2);
        imobiliariaDTO2.setId(imobiliariaDTO1.getId());
        assertThat(imobiliariaDTO1).isEqualTo(imobiliariaDTO2);
        imobiliariaDTO2.setId(2L);
        assertThat(imobiliariaDTO1).isNotEqualTo(imobiliariaDTO2);
        imobiliariaDTO1.setId(null);
        assertThat(imobiliariaDTO1).isNotEqualTo(imobiliariaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(imobiliariaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(imobiliariaMapper.fromId(null)).isNull();
    }
}
