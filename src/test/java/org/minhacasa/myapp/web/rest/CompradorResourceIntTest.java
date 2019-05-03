package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Comprador;
import org.minhacasa.myapp.repository.CompradorRepository;
import org.minhacasa.myapp.service.CompradorService;
import org.minhacasa.myapp.service.dto.CompradorDTO;
import org.minhacasa.myapp.service.mapper.CompradorMapper;
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
 * Test class for the CompradorResource REST controller.
 *
 * @see CompradorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class CompradorResourceIntTest {

    private static final BigDecimal DEFAULT_RENDA = new BigDecimal(1);
    private static final BigDecimal UPDATED_RENDA = new BigDecimal(2);

    private static final String DEFAULT_GARANTIAS = "AAAAAAAAAA";
    private static final String UPDATED_GARANTIAS = "BBBBBBBBBB";

    @Autowired
    private CompradorRepository compradorRepository;

    @Autowired
    private CompradorMapper compradorMapper;

    @Autowired
    private CompradorService compradorService;

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

    private MockMvc restCompradorMockMvc;

    private Comprador comprador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompradorResource compradorResource = new CompradorResource(compradorService);
        this.restCompradorMockMvc = MockMvcBuilders.standaloneSetup(compradorResource)
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
    public static Comprador createEntity(EntityManager em) {
        Comprador comprador = new Comprador()
            .renda(DEFAULT_RENDA)
            .garantias(DEFAULT_GARANTIAS);
        return comprador;
    }

    @Before
    public void initTest() {
        comprador = createEntity(em);
    }

    @Test
    @Transactional
    public void createComprador() throws Exception {
        int databaseSizeBeforeCreate = compradorRepository.findAll().size();

        // Create the Comprador
        CompradorDTO compradorDTO = compradorMapper.toDto(comprador);
        restCompradorMockMvc.perform(post("/api/compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compradorDTO)))
            .andExpect(status().isCreated());

        // Validate the Comprador in the database
        List<Comprador> compradorList = compradorRepository.findAll();
        assertThat(compradorList).hasSize(databaseSizeBeforeCreate + 1);
        Comprador testComprador = compradorList.get(compradorList.size() - 1);
        assertThat(testComprador.getRenda()).isEqualTo(DEFAULT_RENDA);
        assertThat(testComprador.getGarantias()).isEqualTo(DEFAULT_GARANTIAS);
    }

    @Test
    @Transactional
    public void createCompradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = compradorRepository.findAll().size();

        // Create the Comprador with an existing ID
        comprador.setId(1L);
        CompradorDTO compradorDTO = compradorMapper.toDto(comprador);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompradorMockMvc.perform(post("/api/compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compradorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comprador in the database
        List<Comprador> compradorList = compradorRepository.findAll();
        assertThat(compradorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCompradors() throws Exception {
        // Initialize the database
        compradorRepository.saveAndFlush(comprador);

        // Get all the compradorList
        restCompradorMockMvc.perform(get("/api/compradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comprador.getId().intValue())))
            .andExpect(jsonPath("$.[*].renda").value(hasItem(DEFAULT_RENDA.intValue())))
            .andExpect(jsonPath("$.[*].garantias").value(hasItem(DEFAULT_GARANTIAS.toString())));
    }
    
    @Test
    @Transactional
    public void getComprador() throws Exception {
        // Initialize the database
        compradorRepository.saveAndFlush(comprador);

        // Get the comprador
        restCompradorMockMvc.perform(get("/api/compradors/{id}", comprador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comprador.getId().intValue()))
            .andExpect(jsonPath("$.renda").value(DEFAULT_RENDA.intValue()))
            .andExpect(jsonPath("$.garantias").value(DEFAULT_GARANTIAS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingComprador() throws Exception {
        // Get the comprador
        restCompradorMockMvc.perform(get("/api/compradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComprador() throws Exception {
        // Initialize the database
        compradorRepository.saveAndFlush(comprador);

        int databaseSizeBeforeUpdate = compradorRepository.findAll().size();

        // Update the comprador
        Comprador updatedComprador = compradorRepository.findById(comprador.getId()).get();
        // Disconnect from session so that the updates on updatedComprador are not directly saved in db
        em.detach(updatedComprador);
        updatedComprador
            .renda(UPDATED_RENDA)
            .garantias(UPDATED_GARANTIAS);
        CompradorDTO compradorDTO = compradorMapper.toDto(updatedComprador);

        restCompradorMockMvc.perform(put("/api/compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compradorDTO)))
            .andExpect(status().isOk());

        // Validate the Comprador in the database
        List<Comprador> compradorList = compradorRepository.findAll();
        assertThat(compradorList).hasSize(databaseSizeBeforeUpdate);
        Comprador testComprador = compradorList.get(compradorList.size() - 1);
        assertThat(testComprador.getRenda()).isEqualTo(UPDATED_RENDA);
        assertThat(testComprador.getGarantias()).isEqualTo(UPDATED_GARANTIAS);
    }

    @Test
    @Transactional
    public void updateNonExistingComprador() throws Exception {
        int databaseSizeBeforeUpdate = compradorRepository.findAll().size();

        // Create the Comprador
        CompradorDTO compradorDTO = compradorMapper.toDto(comprador);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompradorMockMvc.perform(put("/api/compradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compradorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Comprador in the database
        List<Comprador> compradorList = compradorRepository.findAll();
        assertThat(compradorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComprador() throws Exception {
        // Initialize the database
        compradorRepository.saveAndFlush(comprador);

        int databaseSizeBeforeDelete = compradorRepository.findAll().size();

        // Delete the comprador
        restCompradorMockMvc.perform(delete("/api/compradors/{id}", comprador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Comprador> compradorList = compradorRepository.findAll();
        assertThat(compradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comprador.class);
        Comprador comprador1 = new Comprador();
        comprador1.setId(1L);
        Comprador comprador2 = new Comprador();
        comprador2.setId(comprador1.getId());
        assertThat(comprador1).isEqualTo(comprador2);
        comprador2.setId(2L);
        assertThat(comprador1).isNotEqualTo(comprador2);
        comprador1.setId(null);
        assertThat(comprador1).isNotEqualTo(comprador2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompradorDTO.class);
        CompradorDTO compradorDTO1 = new CompradorDTO();
        compradorDTO1.setId(1L);
        CompradorDTO compradorDTO2 = new CompradorDTO();
        assertThat(compradorDTO1).isNotEqualTo(compradorDTO2);
        compradorDTO2.setId(compradorDTO1.getId());
        assertThat(compradorDTO1).isEqualTo(compradorDTO2);
        compradorDTO2.setId(2L);
        assertThat(compradorDTO1).isNotEqualTo(compradorDTO2);
        compradorDTO1.setId(null);
        assertThat(compradorDTO1).isNotEqualTo(compradorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(compradorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(compradorMapper.fromId(null)).isNull();
    }
}
