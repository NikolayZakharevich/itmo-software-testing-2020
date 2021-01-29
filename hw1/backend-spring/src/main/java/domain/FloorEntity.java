package domain;

import java.util.List;

public class FloorEntity {

    private Long id;

    private List<CabinetsEntity> cabinets;

    public FloorEntity(Long id, List<CabinetsEntity> cabinets) {
        this.id = id;
        this.cabinets = cabinets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CabinetsEntity> getCabinets() {
        return cabinets;
    }

    public void setCabinets(List<CabinetsEntity> cabinets) {
        this.cabinets = cabinets;
    }
}
