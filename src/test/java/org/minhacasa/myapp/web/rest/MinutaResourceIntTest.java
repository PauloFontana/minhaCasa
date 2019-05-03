package org.minhacasa.myapp.web.rest;

import org.minhacasa.myapp.MinhaCasaApp;

import org.minhacasa.myapp.domain.Minuta;
import org.minhacasa.myapp.repository.MinutaRepository;
import org.minhacasa.myapp.service.MinutaService;
import org.minhacasa.myapp.service.dto.MinutaDTO;
import org.minhacasa.myapp.service.mapper.MinutaMapper;
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
import java.util.List;


import static org.minhacasa.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MinutaResource REST controller.
 *
 * @see MinutaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MinhaCasaApp.class)
public class MinutaResourceIntTest {

    private static final String DEFAULT_CONTEUDO = "AAAAAAAAAA";
    private static final String UPDATED_CONTEUDO = "BBBBBBBBBB";

    @Autowired
    private MinutaRepository minutaRepository;

    @Autowired
    private MinutaMapper minutaMapper;

    @Autowired
    private MinutaService minutaService;

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

    private MockMvc restMinutaMockMvc;

    private Minuta minuta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MinutaResource minutaResource = new MinutaResource(minutaService);
        this.restMinutaMockMvc = MockMvcBuilders.standaloneSetup(minutaResource)
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
    public static Minuta createEntity(EntityManager em) {
        Minuta minuta = new Minuta()
            .conteudo(DEFAULT_CONTEUDO);
        return minuta;
    }

    @Before
    public void initTest() {
        minuta = createEntity(em);
    }

    @Test
    @Transactional
    public void createMinuta() throws Exception {
        int databaseSizeBeforeCreate = minutaRepository.findAll().size();

        // Create the Minuta
        MinutaDTO minutaDTO = minutaMapper.toDto(minuta);
        restMinutaMockMvc.perform(post("/api/minutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minutaDTO)))
            .andExpect(status().isCreated());

        // Validate the Minuta in the database
        List<Minuta> minutaList = minutaRepository.findAll();
        assertThat(minutaList).hasSize(databaseSizeBeforeCreate + 1);
        Minuta testMinuta = minutaList.get(minutaList.size() - 1);
        assertThat(testMinuta.getConteudo()).isEqualTo(DEFAULT_CONTEUDO);
    }

    @Test
    @Transactional
    public void createMinutaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = minutaRepository.findAll().size();

        // Create the Minuta with an existing ID
        minuta.setId(1L);
        MinutaDTO minutaDTO = minutaMapper.toDto(minuta);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMinutaMockMvc.perform(post("/api/minutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minutaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Minuta in the database
        List<Minuta> minutaList = minutaRepository.findAll();
        assertThat(minutaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMinutas() throws Exception {
        // Initialize the database
        minutaRepository.saveAndFlush(minuta);

        // Get all the minutaList
        restMinutaMockMvc.perform(get("/api/minutas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(minuta.getId().intValue())))
            .andExpect(jsonPath("$.[*].conteudo").value(hasItem(DEFAULT_CONTEUDO.toString())));
    }
    
    @Test
    @Transactional
    public void getMinuta() throws Exception {
        // Initialize the database
        minutaRepository.saveAndFlush(minuta);

        // Get the minuta
        restMinutaMockMvc.perform(get("/api/minutas/{id}", minuta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(minuta.getId().intValue()))
            .andExpect(jsonPath("$.conteudo").value(DEFAULT_CONTEUDO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMinuta() throws Exception {
        // Get the minuta
        restMinutaMockMvc.perform(get("/api/minutas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMinuta() throws Exception {
        // Initialize the database
        minutaRepository.saveAndFlush(minuta);

        int databaseSizeBeforeUpdate = minutaRepository.findAll().size();

        // Update the minuta
        Minuta updatedMinuta = minutaRepository.findById(minuta.getId()).get();
        // Disconnect from session so that the updates on updatedMinuta are not directly saved in db
        em.detach(updatedMinuta);
        updatedMinuta
            .conteudo(UPDATED_CONTEUDO);
        MinutaDTO minutaDTO = minutaMapper.toDto(updatedMinuta);

        restMinutaMockMvc.perform(put("/api/minutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minutaDTO)))
            .andExpect(status().isOk());

        // Validate the Minuta in the database
        List<Minuta> minutaList = minutaRepository.findAll();
        assertThat(minutaList).hasSize(databaseSizeBeforeUpdate);
        Minuta testMinuta = minutaList.get(minutaList.size() - 1);
        assertThat(testMinuta.getConteudo()).isEqualTo(UPDATED_CONTEUDO);
    }

    @Test
    @Transactional
    public void updateNonExistingMinuta() throws Exception {
        int databaseSizeBeforeUpdate = minutaRepository.findAll().size();

        // Create the Minuta
        MinutaDTO minutaDTO = minutaMapper.toDto(minuta);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMinutaMockMvc.perform(put("/api/minutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(minutaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Minuta in the database
        List<Minuta> minutaList = minutaRepository.findAll();
        assertThat(minutaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMinuta() throws Exception {
        // Initialize the database
        minutaRepository.saveAndFlush(minuta);

        int databaseSizeBeforeDelete = minutaRepository.findAll().size();

        // Delete the minuta
        restMinutaMockMvc.perform(delete("/api/minutas/{id}", minuta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Minuta> minutaList = minutaRepository.findAll();
        assertThat(minutaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Minuta.class);
        Minuta minuta1 = new Minuta();
        minuta1.setId(1L);
        Minuta minuta2 = new Minuta();
        minuta2.setId(minuta1.getId());
        assertThat(minuta1).isEqualTo(minuta2);
        minuta2.setId(2L);
        assertThat(minuta1).isNotEqualTo(minuta2);
        minuta1.setId(null);
        assertThat(minuta1).isNotEqualTo(minuta2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MinutaDTO.class);
        MinutaDTO minutaDTO1 = new MinutaDTO();
        minutaDTO1.setId(1L);
        MinutaDTO minutaDTO2 = new MinutaDTO();
        assertThat(minutaDTO1).isNotEqualTo(minutaDTO2);
        minutaDTO2.setId(minutaDTO1.getId());
        assertThat(minutaDTO1).isEqualTo(minutaDTO2);
        minutaDTO2.setId(2L);
        assertThat(minutaDTO1).isNotEqualTo(minutaDTO2);
        minutaDTO1.setId(null);
        assertThat(minutaDTO1).isNotEqualTo(minutaDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(minutaMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(minutaMapper.fromId(null)).isNull();
    }
}
