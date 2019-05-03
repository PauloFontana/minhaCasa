package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Visita;
import org.minhacasa.myapp.repository.VisitaRepository;
import org.minhacasa.myapp.service.VisitaService;
import org.minhacasa.myapp.service.dto.VisitaDTO;
import org.minhacasa.myapp.service.mapper.VisitaMapper;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static org.minhacasa.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VisitaResource REST controller.
 *
 * @see VisitaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class VisitaResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_AVALIACAO = "AAAAAAAAAA";
    private static final String UPDATED_AVALIACAO = "BBBBBBBBBB";

    @Autowired
    private VisitaRepository visitaRepository;

    @Autowired
    private VisitaMapper visitaMapper;

    @Autowired
    private VisitaService visitaService;

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

    private MockMvc restVisitaMockMvc;

    private Visita visita;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VisitaResource visitaResource = new VisitaResource(visitaService);
        this.restVisitaMockMvc = MockMvcBuilders.standaloneSetup(visitaResource)
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
    public static Visita createEntity(EntityManager em) {
        Visita visita = new Visita()
            .data(DEFAULT_DATA)
            .avaliacao(DEFAULT_AVALIACAO);
        return visita;
    }

    @Before
    public void initTest() {
        visita = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisita() throws Exception {
        int databaseSizeBeforeCreate = visitaRepository.findAll().size();

        // Create the Visita
        VisitaDTO visitaDTO = visitaMapper.toDto(visita);
        restVisitaMockMvc.perform(post("/api/visitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitaDTO)))
            .andExpect(status().isCreated());

        // Validate the Visita in the database
        List<Visita> visitaList = visitaRepository.findAll();
        assertThat(visitaList).hasSize(databaseSizeBeforeCreate + 1);
        Visita testVisita = visitaList.get(visitaList.size() - 1);
        assertThat(testVisita.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testVisita.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
    }

    @Test
    @Transactional
    public void createVisitaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitaRepository.findAll().size();

        // Create the Visita with an existing ID
        visita.setId(1L);
        VisitaDTO visitaDTO = visitaMapper.toDto(visita);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitaMockMvc.perform(post("/api/visitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Visita in the database
        List<Visita> visitaList = visitaRepository.findAll();
        assertThat(visitaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVisitas() throws Exception {
        // Initialize the database
        visitaRepository.saveAndFlush(visita);

        // Get all the visitaList
        restVisitaMockMvc.perform(get("/api/visitas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visita.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].avaliacao").value(hasItem(DEFAULT_AVALIACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getVisita() throws Exception {
        // Initialize the database
        visitaRepository.saveAndFlush(visita);

        // Get the visita
        restVisitaMockMvc.perform(get("/api/visitas/{id}", visita.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(visita.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.avaliacao").value(DEFAULT_AVALIACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVisita() throws Exception {
        // Get the visita
        restVisitaMockMvc.perform(get("/api/visitas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisita() throws Exception {
        // Initialize the database
        visitaRepository.saveAndFlush(visita);

        int databaseSizeBeforeUpdate = visitaRepository.findAll().size();

        // Update the visita
        Visita updatedVisita = visitaRepository.findById(visita.getId()).get();
        // Disconnect from session so that the updates on updatedVisita are not directly saved in db
        em.detach(updatedVisita);
        updatedVisita
            .data(UPDATED_DATA)
            .avaliacao(UPDATED_AVALIACAO);
        VisitaDTO visitaDTO = visitaMapper.toDto(updatedVisita);

        restVisitaMockMvc.perform(put("/api/visitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitaDTO)))
            .andExpect(status().isOk());

        // Validate the Visita in the database
        List<Visita> visitaList = visitaRepository.findAll();
        assertThat(visitaList).hasSize(databaseSizeBeforeUpdate);
        Visita testVisita = visitaList.get(visitaList.size() - 1);
        assertThat(testVisita.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testVisita.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingVisita() throws Exception {
        int databaseSizeBeforeUpdate = visitaRepository.findAll().size();

        // Create the Visita
        VisitaDTO visitaDTO = visitaMapper.toDto(visita);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitaMockMvc.perform(put("/api/visitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Visita in the database
        List<Visita> visitaList = visitaRepository.findAll();
        assertThat(visitaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisita() throws Exception {
        // Initialize the database
        visitaRepository.saveAndFlush(visita);

        int databaseSizeBeforeDelete = visitaRepository.findAll().size();

        // Delete the visita
        restVisitaMockMvc.perform(delete("/api/visitas/{id}", visita.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Visita> visitaList = visitaRepository.findAll();
        assertThat(visitaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visita.class);
        Visita visita1 = new Visita();
        visita1.setId(1L);
        Visita visita2 = new Visita();
        visita2.setId(visita1.getId());
        assertThat(visita1).isEqualTo(visita2);
        visita2.setId(2L);
        assertThat(visita1).isNotEqualTo(visita2);
        visita1.setId(null);
        assertThat(visita1).isNotEqualTo(visita2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VisitaDTO.class);
        VisitaDTO visitaDTO1 = new VisitaDTO();
        visitaDTO1.setId(1L);
        VisitaDTO visitaDTO2 = new VisitaDTO();
        assertThat(visitaDTO1).isNotEqualTo(visitaDTO2);
        visitaDTO2.setId(visitaDTO1.getId());
        assertThat(visitaDTO1).isEqualTo(visitaDTO2);
        visitaDTO2.setId(2L);
        assertThat(visitaDTO1).isNotEqualTo(visitaDTO2);
        visitaDTO1.setId(null);
        assertThat(visitaDTO1).isNotEqualTo(visitaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(visitaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(visitaMapper.fromId(null)).isNull();
    }
}
