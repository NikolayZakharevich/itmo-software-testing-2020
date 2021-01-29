package service;

import domain.CabinetsEntity;
import domain.FloorEntity;
import repository.CabinetRepository;

import java.util.List;
import java.util.stream.Collectors;

public class FloorService {

    private final CabinetRepository cabinetRepository;

    public FloorService(CabinetRepository cabinetRepository) {
        this.cabinetRepository = cabinetRepository;
    }


    public FloorEntity getFloor(Long id, List<String> filters) {
        List<CabinetsEntity> cabinets = cabinetRepository.findAll();
        return new FloorEntity(id,
                cabinets.stream().filter(cabinet ->
                        cabinet.getFloor() == id.intValue() &&
                                filters.contains(cabinet.getType())
                ).collect(Collectors.toList()));
    }

}
