package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.ImovelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Imovel and its DTO ImovelDTO.
 */
@Mapper(componentModel = "spring", uses = {ProprietarioMapper.class})
public interface ImovelMapper extends EntityMapper<ImovelDTO, Imovel> {

    @Mapping(source = "proprietario.id", target = "proprietarioId")
    ImovelDTO toDto(Imovel imovel);

    @Mapping(source = "proprietarioId", target = "proprietario")
    Imovel toEntity(ImovelDTO imovelDTO);

    default Imovel fromId(Long id) {
        if (id == null) {
            return null;
        }
        Imovel imovel = new Imovel();
        imovel.setId(id);
        return imovel;
    }
}
