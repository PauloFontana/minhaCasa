package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.ImobiliariaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Imobiliaria and its DTO ImobiliariaDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ImobiliariaMapper extends EntityMapper<ImobiliariaDTO, Imobiliaria> {


    @Mapping(target = "corretors", ignore = true)
    Imobiliaria toEntity(ImobiliariaDTO imobiliariaDTO);

    default Imobiliaria fromId(Long id) {
        if (id == null) {
            return null;
        }
        Imobiliaria imobiliaria = new Imobiliaria();
        imobiliaria.setId(id);
        return imobiliaria;
    }
}
