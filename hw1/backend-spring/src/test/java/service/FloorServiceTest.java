package service;

import domain.CabinetsEntity;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import repository.CabinetRepository;

import java.util.Collections;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class FloorServiceTest {

    @Mock
    private CabinetRepository cabinetRepository;

    @Before
    public void setUp() throws Exception {
        cabinetRepository = mock(CabinetRepository.class);
    }

    @Test
    public void getFloorWithCoffeepoint() {
        when(cabinetRepository.findAll()).thenReturn(
                Collections.singletonList(new CabinetsEntity())
        );

        FloorService service = new FloorService(cabinetRepository);
        service.getFloor(1L, Collections.singletonList("coffepoint"));
    }

}
