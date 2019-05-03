package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.CompradorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comprador and its DTO CompradorDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface CompradorMapper extends EntityMapper<CompradorDTO, Comprador> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    CompradorDTO toDto(Comprador comprador);

    @Mapping(source = "userId", target = "user")
    Comprador toEntity(CompradorDTO compradorDTO);

    default Comprador fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comprador comprador = new Comprador();
        comprador.setId(id);
        return comprador;
    }
}
