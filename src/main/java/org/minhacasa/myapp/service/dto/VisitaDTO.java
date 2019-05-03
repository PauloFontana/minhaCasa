package org.minhacasa.myapp.service.dto;
import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Visita entity.
 */
public class VisitaDTO implements Serializable {

    private Long id;

    private LocalDate data;

    @Lob
    private String avaliacao;


    private Long imovelId;

    private Long corretorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public Long getImovelId() {
        return imovelId;
    }

    public void setImovelId(Long imovelId) {
        this.imovelId = imovelId;
    }

    public Long getCorretorId() {
        return corretorId;
    }

    public void setCorretorId(Long corretorId) {
        this.corretorId = corretorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VisitaDTO visitaDTO = (VisitaDTO) o;
        if (visitaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visitaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VisitaDTO{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", avaliacao='" + getAvaliacao() + "'" +
            ", imovel=" + getImovelId() +
            ", corretor=" + getCorretorId() +
            "}";
    }
}
