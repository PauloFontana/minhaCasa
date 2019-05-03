package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.RepasseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Repasse and its DTO RepasseDTO.
 */
@Mapper(componentModel = "spring", uses = {ProprietarioMapper.class, CorretorMapper.class})
public interface RepasseMapper extends EntityMapper<RepasseDTO, Repasse> {

    @Mapping(source = "proprietario.id", target = "proprietarioId")
    @Mapping(source = "corretor.id", target = "corretorId")
    RepasseDTO toDto(Repasse repasse);

    @Mapping(source = "proprietarioId", target = "proprietario")
    @Mapping(source = "corretorId", target = "corretor")
    Repasse toEntity(RepasseDTO repasseDTO);

    default Repasse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Repasse repasse = new Repasse();
        repasse.setId(id);
        return repasse;
    }
}
