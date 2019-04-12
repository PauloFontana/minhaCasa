package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Imovel;
import org.minhacasa.myapp.repository.ImovelRepository;
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
 * Test class for the ImovelResource REST controller.
 *
 * @see ImovelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class ImovelResourceIntTest {

    private static final String DEFAULT_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIA = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    private static final String DEFAULT_ATRIBUTOS = "AAAAAAAAAA";
    private static final String UPDATED_ATRIBUTOS = "BBBBBBBBBB";

    @Autowired
    private ImovelRepository imovelRepository;

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

    private MockMvc restImovelMockMvc;

    private Imovel imovel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImovelResource imovelResource = new ImovelResource(imovelRepository);
        this.restImovelMockMvc = MockMvcBuilders.standaloneSetup(imovelResource)
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
    public static Imovel createEntity(EntityManager em) {
        Imovel imovel = new Imovel()
            .categoria(DEFAULT_CATEGORIA)
            .tipo(DEFAULT_TIPO)
            .valor(DEFAULT_VALOR)
            .atributos(DEFAULT_ATRIBUTOS);
        return imovel;
    }

    @Before
    public void initTest() {
        imovel = createEntity(em);
    }

    @Test
    @Transactional
    public void createImovel() throws Exception {
        int databaseSizeBeforeCreate = imovelRepository.findAll().size();

        // Create the Imovel
        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isCreated());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeCreate + 1);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
        assertThat(testImovel.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testImovel.getValor()).isEqualTo(DEFAULT_VALOR);
        assertThat(testImovel.getAtributos()).isEqualTo(DEFAULT_ATRIBUTOS);
    }

    @Test
    @Transactional
    public void createImovelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imovelRepository.findAll().size();

        // Create the Imovel with an existing ID
        imovel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImovelMockMvc.perform(post("/api/imovels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImovels() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        // Get all the imovelList
        restImovelMockMvc.perform(get("/api/imovels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imovel.getId().intValue())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.intValue())))
            .andExpect(jsonPath("$.[*].atributos").value(hasItem(DEFAULT_ATRIBUTOS.toString())));
    }
    
    @Test
    @Transactional
    public void getImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        // Get the imovel
        restImovelMockMvc.perform(get("/api/imovels/{id}", imovel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imovel.getId().intValue()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.intValue()))
            .andExpect(jsonPath("$.atributos").value(DEFAULT_ATRIBUTOS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImovel() throws Exception {
        // Get the imovel
        restImovelMockMvc.perform(get("/api/imovels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        int databaseSizeBeforeUpdate = imovelRepository.findAll().size();

        // Update the imovel
        Imovel updatedImovel = imovelRepository.findById(imovel.getId()).get();
        // Disconnect from session so that the updates on updatedImovel are not directly saved in db
        em.detach(updatedImovel);
        updatedImovel
            .categoria(UPDATED_CATEGORIA)
            .tipo(UPDATED_TIPO)
            .valor(UPDATED_VALOR)
            .atributos(UPDATED_ATRIBUTOS);

        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImovel)))
            .andExpect(status().isOk());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
        Imovel testImovel = imovelList.get(imovelList.size() - 1);
        assertThat(testImovel.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testImovel.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testImovel.getValor()).isEqualTo(UPDATED_VALOR);
        assertThat(testImovel.getAtributos()).isEqualTo(UPDATED_ATRIBUTOS);
    }

    @Test
    @Transactional
    public void updateNonExistingImovel() throws Exception {
        int databaseSizeBeforeUpdate = imovelRepository.findAll().size();

        // Create the Imovel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImovelMockMvc.perform(put("/api/imovels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imovel)))
            .andExpect(status().isBadRequest());

        // Validate the Imovel in the database
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImovel() throws Exception {
        // Initialize the database
        imovelRepository.saveAndFlush(imovel);

        int databaseSizeBeforeDelete = imovelRepository.findAll().size();

        // Delete the imovel
        restImovelMockMvc.perform(delete("/api/imovels/{id}", imovel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Imovel> imovelList = imovelRepository.findAll();
        assertThat(imovelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imovel.class);
        Imovel imovel1 = new Imovel();
        imovel1.setId(1L);
        Imovel imovel2 = new Imovel();
        imovel2.setId(imovel1.getId());
        assertThat(imovel1).isEqualTo(imovel2);
        imovel2.setId(2L);
        assertThat(imovel1).isNotEqualTo(imovel2);
        imovel1.setId(null);
        assertThat(imovel1).isNotEqualTo(imovel2);
    }
}
