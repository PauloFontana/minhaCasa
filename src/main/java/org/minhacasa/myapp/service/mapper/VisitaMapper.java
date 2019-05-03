package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.VisitaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Visita and its DTO VisitaDTO.
 */
@Mapper(componentModel = "spring", uses = {ImovelMapper.class, CorretorMapper.class})
public interface VisitaMapper extends EntityMapper<VisitaDTO, Visita> {

    @Mapping(source = "imovel.id", target = "imovelId")
    @Mapping(source = "corretor.id", target = "corretorId")
    VisitaDTO toDto(Visita visita);

    @Mapping(source = "imovelId", target = "imovel")
    @Mapping(source = "corretorId", target = "corretor")
    Visita toEntity(VisitaDTO visitaDTO);

    default Visita fromId(Long id) {
        if (id == null) {
            return null;
        }
        Visita visita = new Visita();
        visita.setId(id);
        return visita;
    }
}
