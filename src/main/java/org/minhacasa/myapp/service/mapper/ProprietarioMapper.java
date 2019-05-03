package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.ProprietarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Proprietario and its DTO ProprietarioDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ProprietarioMapper extends EntityMapper<ProprietarioDTO, Proprietario> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ProprietarioDTO toDto(Proprietario proprietario);

    @Mapping(source = "userId", target = "user")
    Proprietario toEntity(ProprietarioDTO proprietarioDTO);

    default Proprietario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Proprietario proprietario = new Proprietario();
        proprietario.setId(id);
        return proprietario;
    }
}
