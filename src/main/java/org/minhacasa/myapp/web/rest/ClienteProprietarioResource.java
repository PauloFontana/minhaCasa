package org.minhacasa.myapp.web.rest;
import org.minhacasa.myapp.domain.ClienteProprietario;
import org.minhacasa.myapp.repository.ClienteProprietarioRepository;
import org.minhacasa.myapp.web.rest.errors.BadRequestAlertException;
import org.minhacasa.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ClienteProprietario.
 */
@RestController
@RequestMapping("/api")
public class ClienteProprietarioResource {

    private final Logger log = LoggerFactory.getLogger(ClienteProprietarioResource.class);

    private static final String ENTITY_NAME = "clienteProprietario";

    private final ClienteProprietarioRepository clienteProprietarioRepository;

    public ClienteProprietarioResource(ClienteProprietarioRepository clienteProprietarioRepository) {
        this.clienteProprietarioRepository = clienteProprietarioRepository;
    }

    /**
     * POST  /cliente-proprietarios : Create a new clienteProprietario.
     *
     * @param clienteProprietario the clienteProprietario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clienteProprietario, or with status 400 (Bad Request) if the clienteProprietario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cliente-proprietarios")
    public ResponseEntity<ClienteProprietario> createClienteProprietario(@RequestBody ClienteProprietario clienteProprietario) throws URISyntaxException {
        log.debug("REST request to save ClienteProprietario : {}", clienteProprietario);
        if (clienteProprietario.getId() != null) {
            throw new BadRequestAlertException("A new clienteProprietario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClienteProprietario result = clienteProprietarioRepository.save(clienteProprietario);
        return ResponseEntity.created(new URI("/api/cliente-proprietarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cliente-proprietarios : Updates an existing clienteProprietario.
     *
     * @param clienteProprietario the clienteProprietario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clienteProprietario,
     * or with status 400 (Bad Request) if the clienteProprietario is not valid,
     * or with status 500 (Internal Server Error) if the clienteProprietario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cliente-proprietarios")
    public ResponseEntity<ClienteProprietario> updateClienteProprietario(@RequestBody ClienteProprietario clienteProprietario) throws URISyntaxException {
        log.debug("REST request to update ClienteProprietario : {}", clienteProprietario);
        if (clienteProprietario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClienteProprietario result = clienteProprietarioRepository.save(clienteProprietario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clienteProprietario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cliente-proprietarios : get all the clienteProprietarios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clienteProprietarios in body
     */
    @GetMapping("/cliente-proprietarios")
    public List<ClienteProprietario> getAllClienteProprietarios() {
        log.debug("REST request to get all ClienteProprietarios");
        return clienteProprietarioRepository.findAll();
    }

    /**
     * GET  /cliente-proprietarios/:id : get the "id" clienteProprietario.
     *
     * @param id the id of the clienteProprietario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clienteProprietario, or with status 404 (Not Found)
     */
    @GetMapping("/cliente-proprietarios/{id}")
    public ResponseEntity<ClienteProprietario> getClienteProprietario(@PathVariable Long id) {
        log.debug("REST request to get ClienteProprietario : {}", id);
        Optional<ClienteProprietario> clienteProprietario = clienteProprietarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clienteProprietario);
    }

    /**
     * DELETE  /cliente-proprietarios/:id : delete the "id" clienteProprietario.
     *
     * @param id the id of the clienteProprietario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cliente-proprietarios/{id}")
    public ResponseEntity<Void> deleteClienteProprietario(@PathVariable Long id) {
        log.debug("REST request to delete ClienteProprietario : {}", id);
        clienteProprietarioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
