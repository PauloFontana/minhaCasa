package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Repasse;
import org.minhacasa.myapp.repository.RepasseRepository;
import org.minhacasa.myapp.service.RepasseService;
import org.minhacasa.myapp.service.dto.RepasseDTO;
import org.minhacasa.myapp.service.mapper.RepasseMapper;
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
 * Test class for the RepasseResource REST controller.
 *
 * @see RepasseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class RepasseResourceIntTest {

    private static final BigDecimal DEFAULT_VALOR = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR = new BigDecimal(2);

    @Autowired
    private RepasseRepository repasseRepository;

    @Autowired
    private RepasseMapper repasseMapper;

    @Autowired
    private RepasseService repasseService;

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

    private MockMvc restRepasseMockMvc;

    private Repasse repasse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RepasseResource repasseResource = new RepasseResource(repasseService);
        this.restRepasseMockMvc = MockMvcBuilders.standaloneSetup(repasseResource)
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
    public static Repasse createEntity(EntityManager em) {
        Repasse repasse = new Repasse()
            .valor(DEFAULT_VALOR);
        return repasse;
    }

    @Before
    public void initTest() {
        repasse = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepasse() throws Exception {
        int databaseSizeBeforeCreate = repasseRepository.findAll().size();

        // Create the Repasse
        RepasseDTO repasseDTO = repasseMapper.toDto(repasse);
        restRepasseMockMvc.perform(post("/api/repasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repasseDTO)))
            .andExpect(status().isCreated());

        // Validate the Repasse in the database
        List<Repasse> repasseList = repasseRepository.findAll();
        assertThat(repasseList).hasSize(databaseSizeBeforeCreate + 1);
        Repasse testRepasse = repasseList.get(repasseList.size() - 1);
        assertThat(testRepasse.getValor()).isEqualTo(DEFAULT_VALOR);
    }

    @Test
    @Transactional
    public void createRepasseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = repasseRepository.findAll().size();

        // Create the Repasse with an existing ID
        repasse.setId(1L);
        RepasseDTO repasseDTO = repasseMapper.toDto(repasse);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepasseMockMvc.perform(post("/api/repasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repasseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repasse in the database
        List<Repasse> repasseList = repasseRepository.findAll();
        assertThat(repasseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRepasses() throws Exception {
        // Initialize the database
        repasseRepository.saveAndFlush(repasse);

        // Get all the repasseList
        restRepasseMockMvc.perform(get("/api/repasses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(repasse.getId().intValue())))
            .andExpect(jsonPath("$.[*].valor").value(hasItem(DEFAULT_VALOR.intValue())));
    }
    
    @Test
    @Transactional
    public void getRepasse() throws Exception {
        // Initialize the database
        repasseRepository.saveAndFlush(repasse);

        // Get the repasse
        restRepasseMockMvc.perform(get("/api/repasses/{id}", repasse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(repasse.getId().intValue()))
            .andExpect(jsonPath("$.valor").value(DEFAULT_VALOR.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRepasse() throws Exception {
        // Get the repasse
        restRepasseMockMvc.perform(get("/api/repasses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepasse() throws Exception {
        // Initialize the database
        repasseRepository.saveAndFlush(repasse);

        int databaseSizeBeforeUpdate = repasseRepository.findAll().size();

        // Update the repasse
        Repasse updatedRepasse = repasseRepository.findById(repasse.getId()).get();
        // Disconnect from session so that the updates on updatedRepasse are not directly saved in db
        em.detach(updatedRepasse);
        updatedRepasse
            .valor(UPDATED_VALOR);
        RepasseDTO repasseDTO = repasseMapper.toDto(updatedRepasse);

        restRepasseMockMvc.perform(put("/api/repasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repasseDTO)))
            .andExpect(status().isOk());

        // Validate the Repasse in the database
        List<Repasse> repasseList = repasseRepository.findAll();
        assertThat(repasseList).hasSize(databaseSizeBeforeUpdate);
        Repasse testRepasse = repasseList.get(repasseList.size() - 1);
        assertThat(testRepasse.getValor()).isEqualTo(UPDATED_VALOR);
    }

    @Test
    @Transactional
    public void updateNonExistingRepasse() throws Exception {
        int databaseSizeBeforeUpdate = repasseRepository.findAll().size();

        // Create the Repasse
        RepasseDTO repasseDTO = repasseMapper.toDto(repasse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepasseMockMvc.perform(put("/api/repasses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(repasseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Repasse in the database
        List<Repasse> repasseList = repasseRepository.findAll();
        assertThat(repasseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepasse() throws Exception {
        // Initialize the database
        repasseRepository.saveAndFlush(repasse);

        int databaseSizeBeforeDelete = repasseRepository.findAll().size();

        // Delete the repasse
        restRepasseMockMvc.perform(delete("/api/repasses/{id}", repasse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Repasse> repasseList = repasseRepository.findAll();
        assertThat(repasseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repasse.class);
        Repasse repasse1 = new Repasse();
        repasse1.setId(1L);
        Repasse repasse2 = new Repasse();
        repasse2.setId(repasse1.getId());
        assertThat(repasse1).isEqualTo(repasse2);
        repasse2.setId(2L);
        assertThat(repasse1).isNotEqualTo(repasse2);
        repasse1.setId(null);
        assertThat(repasse1).isNotEqualTo(repasse2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepasseDTO.class);
        RepasseDTO repasseDTO1 = new RepasseDTO();
        repasseDTO1.setId(1L);
        RepasseDTO repasseDTO2 = new RepasseDTO();
        assertThat(repasseDTO1).isNotEqualTo(repasseDTO2);
        repasseDTO2.setId(repasseDTO1.getId());
        assertThat(repasseDTO1).isEqualTo(repasseDTO2);
        repasseDTO2.setId(2L);
        assertThat(repasseDTO1).isNotEqualTo(repasseDTO2);
        repasseDTO1.setId(null);
        assertThat(repasseDTO1).isNotEqualTo(repasseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(repasseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(repasseMapper.fromId(null)).isNull();
    }
}
