package domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "nodes", schema = "public", catalog = "software-testing")
public class NodesEntity {
    private Long id;
    private String type;
    private Integer floor;
    private Integer pointX;
    private Integer pointY;
    private String cabinetId;
    private Object edges;

    @Id
    @GeneratedValue
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "type", nullable = true, length = 50)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "floor", nullable = true)
    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    @Basic
    @Column(name = "point_x", nullable = true)
    public Integer getPointX() {
        return pointX;
    }

    public void setPointX(Integer pointX) {
        this.pointX = pointX;
    }

    @Basic
    @Column(name = "point_y", nullable = true)
    public Integer getPointY() {
        return pointY;
    }

    public void setPointY(Integer pointY) {
        this.pointY = pointY;
    }

    @Basic
    @Column(name = "cabinet_id", nullable = true, length = 50)
    public String getCabinetId() {
        return cabinetId;
    }

    public void setCabinetId(String cabinetId) {
        this.cabinetId = cabinetId;
    }

    @Basic
    @Column(name = "edges", nullable = true)
    public Object getEdges() {
        return edges;
    }

    public void setEdges(Object edges) {
        this.edges = edges;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NodesEntity that = (NodesEntity) o;
        return Objects.equals(type, that.type) && Objects.equals(floor, that.floor) && Objects.equals(pointX, that.pointX) && Objects.equals(pointY, that.pointY) && Objects.equals(cabinetId, that.cabinetId) && Objects.equals(edges, that.edges);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, floor, pointX, pointY, cabinetId, edges);
    }
}
