package domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "cabinets", schema = "public", catalog = "software-testing")
public class CabinetsEntity {
    private String id;
    private Integer floor;
    private Integer level;
    private Integer levelCount;
    private String type;
    private String name;
    private Integer pointX;
    private Integer pointY;
    private Object tables;
    private Object events;

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false, length = 50)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
    @Column(name = "level", nullable = true)
    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    @Basic
    @Column(name = "level_count", nullable = true)
    public Integer getLevelCount() {
        return levelCount;
    }

    public void setLevelCount(Integer levelCount) {
        this.levelCount = levelCount;
    }

    @Basic
    @Column(name = "type", nullable = true, length = 30)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "name", nullable = true, length = 50)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    @Column(name = "tables", nullable = true)
    public Object getTables() {
        return tables;
    }

    public void setTables(Object tables) {
        this.tables = tables;
    }

    @Basic
    @Column(name = "events", nullable = true)
    public Object getEvents() {
        return events;
    }

    public void setEvents(Object events) {
        this.events = events;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CabinetsEntity that = (CabinetsEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(floor, that.floor) && Objects.equals(level, that.level) && Objects.equals(levelCount, that.levelCount) && Objects.equals(type, that.type) && Objects.equals(name, that.name) && Objects.equals(pointX, that.pointX) && Objects.equals(pointY, that.pointY) && Objects.equals(tables, that.tables) && Objects.equals(events, that.events);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, floor, level, levelCount, type, name, pointX, pointY, tables, events);
    }
}
