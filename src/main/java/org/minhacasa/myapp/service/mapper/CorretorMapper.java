package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.CorretorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Corretor and its DTO CorretorDTO.
 */
@Mapper(componentModel = "spring", uses = {ImobiliariaMapper.class})
public interface CorretorMapper extends EntityMapper<CorretorDTO, Corretor> {

    @Mapping(source = "imobiliaria.id", target = "imobiliariaId")
    CorretorDTO toDto(Corretor corretor);

    @Mapping(source = "imobiliariaId", target = "imobiliaria")
    Corretor toEntity(CorretorDTO corretorDTO);

    default Corretor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Corretor corretor = new Corretor();
        corretor.setId(id);
        return corretor;
    }
}
