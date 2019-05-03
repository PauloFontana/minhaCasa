package org.minhacasa.myapp.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Corretor entity.
 */
public class CorretorDTO implements Serializable {

    private Long id;

    @NotNull
    private String registroImobiliaria;

    @NotNull
    private String password;

    @NotNull
    private String numeroCreci;

    private String contaCorrente;


    private Long imobiliariaId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistroImobiliaria() {
        return registroImobiliaria;
    }

    public void setRegistroImobiliaria(String registroImobiliaria) {
        this.registroImobiliaria = registroImobiliaria;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNumeroCreci() {
        return numeroCreci;
    }

    public void setNumeroCreci(String numeroCreci) {
        this.numeroCreci = numeroCreci;
    }

    public String getContaCorrente() {
        return contaCorrente;
    }

    public void setContaCorrente(String contaCorrente) {
        this.contaCorrente = contaCorrente;
    }

    public Long getImobiliariaId() {
        return imobiliariaId;
    }

    public void setImobiliariaId(Long imobiliariaId) {
        this.imobiliariaId = imobiliariaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CorretorDTO corretorDTO = (CorretorDTO) o;
        if (corretorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), corretorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CorretorDTO{" +
            "id=" + getId() +
            ", registroImobiliaria='" + getRegistroImobiliaria() + "'" +
            ", password='" + getPassword() + "'" +
            ", numeroCreci='" + getNumeroCreci() + "'" +
            ", contaCorrente='" + getContaCorrente() + "'" +
            ", imobiliaria=" + getImobiliariaId() +
            "}";
    }
}
