package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.MinutaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Minuta and its DTO MinutaDTO.
 */
@Mapper(componentModel = "spring", uses = {ImovelMapper.class, ProprietarioMapper.class, CompradorMapper.class})
public interface MinutaMapper extends EntityMapper<MinutaDTO, Minuta> {

    @Mapping(source = "imovel.id", target = "imovelId")
    @Mapping(source = "proprietario.id", target = "proprietarioId")
    @Mapping(source = "comprador.id", target = "compradorId")
    MinutaDTO toDto(Minuta minuta);

    @Mapping(source = "imovelId", target = "imovel")
    @Mapping(source = "proprietarioId", target = "proprietario")
    @Mapping(source = "compradorId", target = "comprador")
    Minuta toEntity(MinutaDTO minutaDTO);

    default Minuta fromId(Long id) {
        if (id == null) {
            return null;
        }
        Minuta minuta = new Minuta();
        minuta.setId(id);
        return minuta;
    }
}
