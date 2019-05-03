package org.minhacasa.myapp.service.mapper;

import org.minhacasa.myapp.domain.*;
import org.minhacasa.myapp.service.dto.PagamentoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Pagamento and its DTO PagamentoDTO.
 */
@Mapper(componentModel = "spring", uses = {CompradorMapper.class, CorretorMapper.class})
public interface PagamentoMapper extends EntityMapper<PagamentoDTO, Pagamento> {

    @Mapping(source = "comprador.id", target = "compradorId")
    @Mapping(source = "corretor.id", target = "corretorId")
    PagamentoDTO toDto(Pagamento pagamento);

    @Mapping(source = "compradorId", target = "comprador")
    @Mapping(source = "corretorId", target = "corretor")
    Pagamento toEntity(PagamentoDTO pagamentoDTO);

    default Pagamento fromId(Long id) {
        if (id == null) {
            return null;
        }
        Pagamento pagamento = new Pagamento();
        pagamento.setId(id);
        return pagamento;
    }
}
